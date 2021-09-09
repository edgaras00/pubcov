const pool = require("../../database");

exports.articles_get_all = async (req, res) => {
  // Get all articles (default query with no filters)

  // Article limit per page
  const LIMIT = 10;
  // Get page number from query string parameters
  let page = req.query.page;
  // Return first page if page is not in query string parameters
  if (!req.query.page) {
    page = 1;
  }
  // Query result offset
  const offset = LIMIT * page - LIMIT;

  try {
    // Get number of total available results
    const counts = await pool.query(`SELECT COUNT(*) FROM article`);
    // Get all articles
    // aggregated_info: materialized view for aggregated article data
    // aggregates authors, keywords, publication types, categories
    const data = await pool.query(
      `SELECT a.pmid,
                  a.title,
                  a.abstract,
                  a.pubdate,
                  a.volume,
                  a.issue,
                  coalesce(a.pii, '') pii,
                  coalesce(a.pmc, '') pmc,
                  coalesce(a.doi, '') doi,
                  ai.authors,
                  ai.keywords,
                  ai.categories,
                  ai.publication_types,
                  j.journal_name journal,
                  j.id journal_id
        FROM article a
        INNER JOIN aggregated_info ai ON ai.pmid = a.pmid
        INNER JOIN journal j ON j.id = a.journal_id
        ORDER BY a.pmid DESC
        OFFSET ${offset}
        LIMIT 10
        `
    );
    count = counts.rows[0].count;
    // How many pages in paginated data
    const totalPages = Math.ceil(count / LIMIT);
    res.status(200).json({
      page: page,
      totalPages: totalPages,
      data: data.rows,
      count: count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.articles_get_category_counts = async (req, res) => {
  // Get article count for each available category
  try {
    const data = await pool.query(
      `SELECT c.category,
              COUNT(a.pmid) count
       FROM article a 
       INNER JOIN article_category ac ON ac.pmid = a.pmid
       INNER JOIN category c ON c.id = ac.category_id
       GROUP BY c.category
       ORDER BY count DESC
      `
    );
    res.status(200).json({ data: data.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.articles_get_ptype_counts = async (req, res) => {
  // Get article count for each available publication type
  try {
    const data = await pool.query(
      `SELECT p.publication_type,
              count(a.pmid) count
       FROM article a
       INNER JOIN article_pubtype ap ON ap.pmid = a.pmid
       INNER JOIN publication_type p ON ap.ptype_id = p.id
       GROUP BY p.publication_type
       ORDER BY count DESC
      `
    );
    res.status(200).json({ data: data.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Sidebar filters
exports.articles_filter = async (req, res) => {
  // Category filters
  let categories;
  // A string is returned if one category filter is chosen
  // Put it inside an array
  if (typeof req.query.category === "string") {
    categories = [req.query.category];
    // Multiple category filters return an array of strings
  } else {
    categories = req.query.category;
  }

  // Publication type filters
  let pubTypes;
  if (typeof req.query.pubtype === "string") {
    // String if one pubtype filter
    // Put it inside an array
    pubTypes = [req.query.pubtype];
  } else {
    // Multiple publication types return array of strings
    pubTypes = req.query.pubtype;
  }

  // Abstract filter
  const abstract = req.query.abstract;
  // Author id filter
  const authorId = req.query.author;
  // Journal id filter
  const journalId = req.query.journal;
  // Search term
  const term = req.query.term;

  // Return 10 articles per page
  const LIMIT = 10;
  // Page of paginated query data
  let page = req.query.page;
  // Return page 1 if page is not in query params
  if (!req.query.page) {
    page = 1;
  }
  // Result offset
  const offset = LIMIT * page - LIMIT;

  try {
    // Highlihted results if user uses search bar
    // Corresponding words are highlighted in the article title and abstract
    // Results are returned by weighted rank (descending)
    // Reference:
    // https://www.postgresql.org/docs/9.1/textsearch-controls.html
    // 12.3.4 Highlighting Results
    let highlights = "";
    let searchCondition = "";

    if (term) {
      // Highlight the search term in abstract and title if user uses search
      highlights = `,ts_headline(a.abstract, plainto_tsquery('${term}'), 'HighlightAll=True') abstract_hl,
                    ts_headline(a.title, plainto_tsquery('${term}'), 'HighlightAll=True') title_hl`;
      searchCondition = `a.pmid IN (
                             SELECT pmid
                             FROM search
                             WHERE doc @@ plainto_tsquery('${term}')
                             ORDER BY ts_rank(doc, plainto_tsquery('${term}')) DESC
                             )`;
    }

    // Fixed part of the  query that is used with/without filters
    const fixedQuery = `SELECT DISTINCT(a.pmid),
                              a.title,
                              a.abstract,
                              a.pubdate,
                              a.volume,
                              a.issue,
                              coalesce(a.pii, '') pii,
                              coalesce(a.pmc, '') pmc,
                              coalesce(a.doi, '') doi,
                              ai.authors,
                              ai.keywords,
                              ai.categories,
                              ai.publication_types,
                              j.journal_name journal,
                              j.id journal_id
                              ${highlights}
                       FROM article a
                            INNER JOIN aggregated_info ai ON a.pmid = ai.pmid
                            INNER JOIN journal j ON j.id = a.journal_id
                      `;

    // Complete query that will be used to fetch data from the database
    let completeQuery = "";
    // Check for abstract filter
    // Add abstract condition if user chooses results with available abstract
    let abstractCondition = abstract ? "a.abstract <> ''" : "";

    // String for a filter JOIN if that filter is selected by the user
    let categoryJoin = "";
    let authorJoin = "";
    let pubtypeJoin = "";
    // WHERE conditions to get specific filter data
    let categoryCondition = "";
    let pubtypeCondition = "";
    let authorCondition = "";

    let journalCondition = journalId ? `j.id = ${journalId}` : "";

    // Assign JOIN and WHERE condition values if filters are selected
    if (categories) {
      categoryJoin = `INNER JOIN article_category ac ON ac.pmid = a.pmid
                        INNER JOIN category c ON c.id = ac.category_id
                        `;
      categoryCondition = `c.id IN (
                            SELECT c.id
                            FROM category c
                            WHERE c.category = ANY ($${pubTypes ? "2" : "1"})
                            )`;
    }

    if (pubTypes) {
      pubtypeJoin = `INNER JOIN article_pubtype ap ON ap.pmid = a.pmid
                       INNER JOIN publication_type p ON p.id = ap.ptype_id
                      `;
      pubtypeCondition = `p.id IN (
                           SELECT p.id
                           FROM publication_type p
                           WHERE p.publication_type = ANY ($1)
                         )`;
    }

    if (authorId) {
      authorJoin = `INNER JOIN article_author aa ON a.pmid = aa.pmid`;
      authorCondition = `aa.author_id = ${authorId}`;
    }

    // Build complete query

    if (pubTypes && categories) {
      // If both category and pubtype filters are used
      completeQuery = `${fixedQuery}
                          ${pubtypeJoin}
                          ${categoryJoin}
                          WHERE (
                            ${pubtypeCondition} AND
                            ${categoryCondition}
                          )
                          ${term ? `AND ${searchCondition}` : ""}
                          ${abstract ? "AND" : ""} ${abstractCondition}
                          ${journalId ? "AND" : ""} ${journalCondition}
                          ORDER BY a.pmid DESC`;
    } else {
      // If one of the two is selected
      completeQuery = `${fixedQuery}
                          ${categoryJoin}
                          ${pubtypeJoin}
                          ${authorJoin}
                          WHERE ${categoryCondition} ${pubtypeCondition}
                          ${term && (pubTypes || categories) ? "AND" : ""} 
                          ${term ? searchCondition : ""}
                          ${
                            abstract && (pubTypes || categories || term)
                              ? "AND"
                              : ""
                          } ${abstractCondition}
                          ${
                            authorId &&
                            (pubTypes || categories || term || abstract)
                              ? "AND"
                              : ""
                          } ${authorCondition}
                          ${
                            journalId &&
                            (pubTypes || categories || term || abstract)
                              ? "AND"
                              : ""
                          } ${journalCondition}
                          ORDER BY a.pmid DESC     
                   `;
    }


    // Filter parameters that will be passed to the query
    const parameters = [];
    if (pubTypes) {
      parameters.push(pubTypes);
    }
    if (categories) {
      parameters.push(categories);
    };


    // Get total result count
    const counts = await pool.query(
      `SELECT COUNT(*) FROM (${completeQuery}) c`,
      parameters
    );
    // Get article data
    const data = await pool.query(
      `${completeQuery} OFFSET ${offset} LIMIT 10`,
      parameters
    );
    const count = counts.rows[0].count;
    const totalPages = Math.ceil(count / LIMIT);
    res.status(200).json({
      data: data.rows,
      count: count,
      totalPages: totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
