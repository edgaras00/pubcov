import React, { useState, useEffect, useContext } from "react";
import { ArticleContext } from "../Context/articleContext";
import Sidebar from "./Sidebar";
import Article from "./Article";
import PageModal from "./PageModal";
import Header from "./Header";
import { numberWithCommas, capitalizeArrayWords } from "../utils/utils";
import History from "../utils/History";
import qs from "query-string";
import { validCategories, validPubtypes } from "../utils/validFilters";

function Articles() {
  // Functional container component

  // Container states

  // Array of unique category counts
  const [categoryCounts, setCategoryCounts] = useState([]);
  // Array of unique publication type counts
  const [pubtypeCounts, setPubtypeCounts] = useState([]);
  // Current page (used for paginated data retrieval)
  const [page, setPage] = useState(1);
  // Page number that the user can select to go to
  const [pageJump, setPageJump] = useState(2);
  // Boolean to track when all query parameter state changes are finished
  // Fetch data when all parameters are checked
  const [parametersFinished, setParametersFinished] = useState(false);

  // React Context
  // Application states that are available to multiple component
  const {
    articleData,
    setArticleData,
    abstractAvailable,
    setAbstractAvailable,
    setSearchInput,
    chosenCategories,
    setChosenCategories,
    chosenTypes,
    setChosenTypes,
    selectedTags,
    setSelectedTags,
    authors,
    journalId,
    setJournalId,
    journalName,
    setJournalName,
    numberOfRows,
    setNumberOfRows,
    setTotalPages,
    totalPages,
    searchTerm,
    setSearchTerm,
    setAuthors,
    setIsLoading,
  } = useContext(ArticleContext);

  useEffect(() => {
    // Parse query parameters and modify the state
    // When a user enters the website using query parameters

    // Use the query-string (qs) module to parse query strings
    // Returns an object
    // Key: website filter category
    // Value: filter category value (string for single / array for multiple)
    // single: {category: 'evolution', page: 2} = ?category=evolution&page=2
    const query = qs.parse(window.location.search);

    // Check if user entered any query parameters
    if (Object.keys(query).length > 0) {
      // Wait until all filter states are changed based on query parameters
      setParametersFinished(false);
      Object.keys(query).forEach((key) => {
        // Check if filter type is article category
        console.log(query[key]);
        if (key === "category") {
          // Valid category values
          const catArray = validCategories.data.map((item) => item["category"]);

          // Check if user entered only one filter per category
          // Single filter value: value is string
          if (typeof query[key] === "string") {
            // Check if valid category
            if (catArray.includes(query[key])) {
              setChosenCategories((prev) => [...prev, query[key]]);
            }
          } else {
            // More than one filter value per category
            // Returned value is an array of strings
            // Check if every category is valid
            if (query[key].every((cat) => catArray.includes(cat))) {
              setChosenCategories((prev) => [...prev, ...query[key]]);
              // Check if some categories are valid
              // Filter out wrong categories
            } else if (query[key].some((cat) => catArray.includes(cat))) {
              const someCat = query[key].filter((cat) =>
                catArray.includes(cat)
              );
              setChosenCategories(someCat);
            }
          }
        }

        // Check if filter type is article publication type
        if (key === "pubtype") {
          // Valid pubtype values
          const ptArray = validPubtypes.data.map(
            (item) => item["publication_type"]
          );
          // Check if single filter value is used
          if (typeof query[key] === "string") {
            // Check if valid pubtype value
            if (ptArray.includes(query[key])) {
              setChosenTypes((prev) => [...prev, query[key]]);
            }
            // Check if multiple filter values were used for that filter type
          } else {
            // Check if all are valid pubtypes
            if (query[key].every((pt) => ptArray.includes(pt))) {
              setChosenTypes((prev) => [...prev, ...query[key]]);
              // Check if some are valid pubtypes
              // Filter out wrong ones
            } else if (query[key].some((pt) => ptArray.includes(pt))) {
              const somePt = query[key].filter((pt) => ptArray.includes(pt));
              setChosenTypes(somePt);
            }
          }
        }
        // Check if "abstract" filter is in the query parameters
        if (key === "abstract") {
          setAbstractAvailable(true);
        }
        // Check if a search term is in query parameters
        if (key === "term") {
          // Fill the input element if "term" filter is used
          setSearchInput(query[key]);
          setSearchTerm(query[key]);
        }
        // Check fot any selected keywords/tags in query params
        if (key === "keyword") {
          setSelectedTags((prev) => [...prev, query[key]]);
        }
        // Check if query parameter contains a page number
        if (key === "page") {
          setPage(parseInt(query[key]));
        }
        // Check if query parameter contains a journal id
        if (key === "journal") {
          if (typeof query[key] === "string") {
            setJournalId(query[key]);
          } else {
            setJournalId(query[key][0]);
          }
        }
        // Check if query paramter is author id
        if (key === "author") {
          if (typeof query[key] === "string") {
            setAuthors(query[key]);
          } else {
            setAuthors(query[key][0]);
          }
        }
      });
    }
    setParametersFinished(true);
  }, [
    setAbstractAvailable,
    setChosenCategories,
    setChosenTypes,
    setSearchInput,
    setSelectedTags,
    setJournalId,
    setSearchTerm,
    setTotalPages,
    setNumberOfRows,
    setAuthors,
  ]);

  useEffect(() => {
    // Modify state if any of the filters are selected

    // Default API query that returns all articles from the database
    let apiQuery = `http://localhost:5000/articles/?page=${page}`;

    // // Query parameters / values
    let queryValues = "";
    let filtersApplied = false;

    // Category filter
    // Go through each category in the chosenCategories state array
    // Add that category as a query parameter
    chosenCategories.forEach((category) => {
      if (queryValues.length === 0) {
        queryValues += `category=${category}`;
      } else {
        queryValues += `&category=${category}`;
      }
    });

    // Publication type filter
    // Go through each publication type in the chosenTypes state array
    // Add that pubtype to query string
    if (chosenTypes.length > 0) {
      chosenTypes.forEach((pubtype) => {
        // If this is the first filter
        if (queryValues.length === 0) {
          queryValues += `pubtype=${pubtype.trim()}`;
          // If this is not the first filter
        } else {
          queryValues += `&pubtype=${pubtype.trim()}`;
        }
      });
    }

    // Author filter
    if (authors) {
      // First filter
      if (queryValues.length === 0) {
        queryValues += `author=${authors.split(" ").join("")}`;
        // Not first filter
      } else {
        queryValues += `&author=${authors.split(" ").join("")}`;
      }
    }

    // Journal filter
    if (journalId) {
      // First filter
      if (queryValues.length === 0) {
        queryValues += `journal=${journalId}`;
        // Not first filter
      } else {
        queryValues += `&journal=${journalId}`;
      }
    }

    // Search term filter
    if (searchTerm) {
      // First filter
      if (queryValues.length === 0) {
        queryValues += `term=${searchTerm}`;
        // Not first filter
      } else {
        queryValues += `&term=${searchTerm}`;
      }
    }

    // Paper abstract filter
    if (abstractAvailable) {
      // First filter
      if (queryValues.length === 0) {
        queryValues += "abstract=true";
        // Not first filter
      } else {
        queryValues += "&abstract=true";
      }
    }

    // Add page to the query
    if (queryValues.length === 0) {
      // First filter
      queryValues += `page=${page}`;
      // Not first filter
    } else {
      queryValues += `&page=${page}`;
    }

    // Modify query parameters in the browser
    if (queryValues.length > 0) {
      // Add query parameters to the browser
      History.replace(`?${queryValues}`);
    } else {
      History.replace("");
    }

    // Check if any of the provided filters are selected
    if (
      chosenCategories.length > 0 ||
      chosenTypes.length > 0 ||
      abstractAvailable ||
      authors ||
      searchTerm ||
      journalId
    ) {
      filtersApplied = true;
    }

    // Modify API query by adding selected filters
    if (queryValues.length > 0 && filtersApplied) {
      apiQuery = `http://localhost:5000/articles/filter?${queryValues}`;
    }
    // Fetch data
    if (parametersFinished) {
      setIsLoading(true);
      fetch(apiQuery)
        .then((res) => res.json())
        .then((data) => {
          setArticleData(data.data);
          setIsLoading(false);
          if (data.count) {
            // Number of returned rows / articles
            setNumberOfRows(data.count);
          }

          if (data.totalPages) {
            // Total pages (paginated data)
            setTotalPages(data.totalPages);
          }
        });
    }
  }, [
    chosenCategories,
    chosenTypes,
    abstractAvailable,
    searchTerm,
    selectedTags,
    setArticleData,
    authors,
    page,
    journalId,
    setNumberOfRows,
    setTotalPages,
    parametersFinished,
    setIsLoading,
  ]);

  // Fetch the first page of data after adding a new filter
  useEffect(() => {
    setPage(1);
  }, [chosenCategories, chosenTypes, abstractAvailable]);

  // Scroll back to the top after changing page
  useEffect(() => {
    window.scrollTo(0, 5);
  }, [page]);

  useEffect(() => {
    if (!journalName && articleData.length > 0) {
      setJournalName(articleData[0].journal);
    }
  }, [journalId, articleData, journalName, setJournalName]);

  // Initial render of filter categories and counts
  useEffect(() => {
    // Fetch category count
    fetch("http://localhost:5000/articles/categories/counts")
      .then((res) => res.json())
      .then((data) => setCategoryCounts(data.data));

    // Fetch publication type counts
    fetch("http://localhost:5000/articles/pubtypes/counts")
      .then((res) => res.json())
      .then((data) => setPubtypeCounts(data.data));
  }, []);

  // Create an array of Article components
  const articleComponents = articleData.map((item) => {
    return (
      <Article
        key={item.pmid + "A"}
        pmid={item.pmid}
        title={item.title}
        abstract={item.abstract}
        pubdate={item.pubdate}
        authors={item.authors}
        categories={item.categories}
        keywords={item.keywords}
        doi={item.doi}
        pmc={item.pmc}
        pii={item.pii}
        journal={item.journal}
        journalId={item.journal_id}
        volume={item.volume}
        issue={item.issue}
        pubtypes={item.publication_types}
        abstractHighlight={item.abstract_hl}
        titleHighlight={item.title_hl}
        setSearchTerm={setSearchTerm}
      />
    );
  });

  function clearFilters() {
    // Function to clear ALL selected filters
    setChosenCategories([]);
    setChosenTypes([]);
    setAbstractAvailable(false);
    setJournalId("");
  }

  // Showing result range for a page
  // Page 1: 1 - 10
  // Page 2: 2-20
  const resultRangeStart = page * 10 - 9;
  const resultRangeEnd = page * 10;

  // Selected filter list to be displayed on the page
  const filterList = [
    ...chosenTypes,
    ...capitalizeArrayWords(chosenCategories),
  ];
  if (abstractAvailable) {
    filterList.push("Abstract");
  }
  if (journalId) {
    filterList.push(`Journal: ${journalName}`);
  }

  // Selected filters infomation display
  let selectedFilterDisplay = null;
  if (
    chosenCategories.length > 0 ||
    chosenTypes.length > 0 ||
    abstractAvailable ||
    journalId
  ) {
    selectedFilterDisplay = (
      <div>
        <span className="filter-one">Filters applied: </span>
        <span className="filter-two">{filterList.join(", ")} </span>
        <span onClick={clearFilters} className="clear-filter">
          Clear all
        </span>
      </div>
    );
  }

  return (
    <div className="container">
      <Header setArticleData={setArticleData} setSearchTerm={setSearchTerm} />
      <div className="block-two">
        <Sidebar categories={categoryCounts} pubtypes={pubtypeCounts} />
        <div className="article-info-container">
          <div className="selected-filters">{selectedFilterDisplay}</div>
          <div className="results-page">
            {/* Number of results */}
            <span className="number-rows">
              {numberOfRows > 0
                ? `${numberWithCommas(numberOfRows)} results`
                : null}
            </span>
            <br />
            {/* Page number */}
            <span className="page">Page {page}</span>
          </div>
          <br />
          <span className="range">
            Results {resultRangeStart} - {resultRangeEnd}
          </span>
          <br />
          <br />
          <br />
          {articleComponents}
          <div className="change-page">
            {page > 1 ? (
              <button onClick={() => setPage((prev) => prev - 1)}>
                Previous
              </button>
            ) : null}
            <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
            {/* Modal to switch pages */}
            <PageModal
              pageJump={pageJump}
              totalPages={totalPages}
              changePageJump={setPageJump}
              changePage={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
