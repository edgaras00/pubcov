-- SQL code to create the PubCoV database

-- Drop database if it already exists
DROP DATABASE IF EXISTS pubcov;

-- Create database
CREATE DATABASE pubcov;

-- Connect to the database
\c pubcov

-- Article author table
CREATE TABLE author (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(55) NOT NULL,
    middle_name VARCHAR(300),
    last_name VARCHAR(50)
);

-- Journal table
CREATE TABLE journal (
    id BIGSERIAL PRIMARY KEY,
    journal_name VARCHAR(255) NOT NULL
);

-- Article publication type table
CREATE TABLE publication_type (
    id BIGSERIAL PRIMARY KEY,
    publication_type VARCHAR(100) NOT NULL
);

-- Article category table
CREATE TABLE category (
    id BIGSERIAL PRIMARY KEY,
    category VARCHAR(255) NOT NULL
);

-- Article keyword table
CREATE TABLE keyword (
    id BIGSERIAL PRIMARY KEY,
    keyword VARCHAR(255) NOT NULL
);

-- Article table
CREATE TABLE article (
    pmid INT PRIMARY KEY,
    title VARCHAR(1080) NOT NULL,
    abstract TEXT,
    pubdate DATE,
    volume VARCHAR(12),
    issue VARCHAR(20),
    published_online DATE,
    first_author_id INT,
    pii VARCHAR(90),
    pmc VARCHAR(50),
    doi VARCHAR(60),
    journal_id INT NOT NULL,
    FOREIGN KEY (journal_id)
        REFERENCES journal (id)
);


-- Intermediary tables to deal with many-to-many relationships
-- Article - author intermediary table
CREATE TABLE article_author (
    author_id INT NOT NULL,
    pmid INT NOT NULL,
    PRIMARY KEY (pmid, author_id),
    FOREIGN KEY (pmid)
        REFERENCES article (pmid),
    FOREIGN KEY (author_id)
        REFERENCES author (id)
);

-- Artickle - keyword intermediary table
CREATE TABLE article_keyword (
    pmid INT NOT NULL,
    keyword_id INT NOT NULL,
    PRIMARY KEY (pmid, keyword_id),
    FOREIGN KEY (pmid)
        REFERENCES article (pmid),
    FOREIGN KEY (keyword_id)
        REFERENCES keyword (id)
);

-- Article - category intermediary table
CREATE TABLE article_category (
    pmid INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (pmid, category_id),
    FOREIGN KEY (pmid)
        REFERENCES article (pmid),
    FOREIGN KEY (category_id)
        REFERENCES category (id)
);

-- Article - pubtype intermediary table
CREATE TABLE article_pubtype (
    pmid INT NOT NULL,
    ptype_id INT NOT NULL,
    PRIMARY KEY (pmid, ptype_id),
    FOREIGN KEY (pmid)
        REFERENCES article (pmid),
    FOREIGN KEY (ptype_id)
        REFERENCES publication_type (id)
);


-- Data population

COPY author FROM '/Users/owner/Desktop/webdev/projects/pubcov/author2.tsv';

COPY journal FROM '/Users/owner/Desktop/webdev/projects/pubcov/journal.tsv';

COPY publication_type FROM '/Users/owner/Desktop/webdev/projects/pubcov/pubtype.tsv';

COPY category FROM '/Users/owner/Desktop/webdev/projects/pubcov/category.tsv';

COPY keyword FROM '/Users/owner/Desktop/webdev/projects/pubcov/keyword.tsv';

COPY article FROM '/Users/owner/Desktop/webdev/projects/pubcov/article2.tsv';

COPY article_author FROM '/Users/owner/Desktop/webdev/projects/pubcov/article_author.tsv';

COPY article_keyword FROM '/Users/owner/Desktop/webdev/projects/pubcov/article_keyword.tsv';

COPY article_category FROM '/Users/owner/Desktop/webdev/projects/pubcov/article_category.tsv';

COPY article_pubtype FROM '/Users/owner/Desktop/webdev/projects/pubcov/article_pubtype.tsv';

-- Create indexes

CREATE INDEX author_id_idx ON article_author (author_id);
CREATE INDEX category_id_idx ON article_category (category_id);
CREATE INDEX keyword_id_idx ON article_keyword (keyword_id);
CREATE INDEX pubtype_id_idx ON article_pubtype (ptype_id);

-- Create a materialized view to cache the result of a complex query
-- Reference: https://www.postgresql.org/docs/9.3/rules-materializedviews.html
-- Aggregates authors, categories, pubtypes, and keywords for each article
-- This aggregate data appears in almost every query within the website
-- So it is important to have it stored for time/perfomance reasons
-- A simple view would not be enough for it as it recomputes data every time


CREATE MATERIALIZED VIEW aggregated_info
AS 
(SELECT a.pmid,
       a.authors,
       a.keywords,
       a.categories,
       array_agg(p.publication_type || ' ' || p.id) publication_types
FROM (
    SELECT a.pmid,
       a.authors,
       a.keywords,
       array_agg(c.category || ' ' || c.id) categories
FROM (
    SELECT a.pmid,
       a.authors,
       array_agg(k.keyword || ' ' || k.id) keywords
    FROM (
        SELECT a.pmid,
        array_agg(au.first_name || ' ' || au.last_name || ' ' || au.id) authors
        FROM article a 
        INNER JOIN article_author aa ON aa.pmid = a.pmid
        INNER JOIN author au ON au.id = aa.author_id
        GROUP BY a.pmid
    ) a 
    LEFT JOIN article_keyword ak ON ak.pmid = a.pmid
    LEFT JOIN keyword k ON k.id = ak.keyword_id
    GROUP BY a.pmid, a.authors
) a
LEFT JOIN article_category ac ON ac.pmid = a.pmid
LEFT JOIN category c ON c.id = ac.category_id
GROUP BY a.pmid, a.authors, a.keywords 
) a
INNER JOIN article_pubtype ap ON ap.pmid = a.pmid
INNER JOIN publication_type p ON p.id = ap.ptype_id
GROUP BY a.pmid, a.authors, a.keywords, a.categories);


-- Search
-- Weighted full text search 
-- Reference: https://www.postgresql.org/docs/9.1/textsearch-controls.html
-- Weights: A > B > C > D
CREATE MATERIALIZED VIEW search
AS
(SELECT a.pmid,
       setweight(to_tsvector(a.title), 'A') ||
       setweight(to_tsvector(coalesce(a.abstract, '') || ' ' || coalesce(string_agg(k.keyword, ', '), '')), 'B') ||
       setweight(to_tsvector(a.journal), 'C') ||
       setweight(to_tsvector(a.authors), 'D')
       as doc
FROM (
    SELECT a.pmid,
           a.title,
           a.abstract,
           j.journal_name journal,
           string_agg(au.first_name || ' ' || au.last_name, ', ') authors
    FROM article a 
    INNER JOIN article_author aa ON aa.pmid = a.pmid
    INNER JOIN author au ON au.id = aa.author_id
    INNER JOIN journal j on j.id = a.journal_id
    GROUP BY a.pmid, journal_name, a.title, a.abstract
) a
LEFT JOIN article_keyword ak ON ak.pmid = a.pmid
LEFT JOIN keyword k ON k.id = ak.keyword_id
GROUP BY a.pmid, a.journal, a.authors, a.title, a.abstract);
