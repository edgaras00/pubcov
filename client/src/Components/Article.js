import React, { useContext } from "react";
import { ArticleContext } from "../Context/articleContext";
import CollapseExpand from "./CollapseExpand";
import CollapseTags from "./CollapseTags";
import ExpandTags from "./ExpandTags";
import "../styles.css";

function Article(props) {
  // Article component that renders all information about the article

  // React Context
  // Access state
  const {
    setChosenCategories,
    setChosenTypes,
    setAuthors,
    setSearchInput,
    setJournalId,
    setJournalName,
    mainCategories,
    setMainCategories,
    setMainTypes,
    mainTypes,
  } = useContext(ArticleContext);

  function handleCategoryClick(category) {
    // Function to change category state based on clicked category tag
    setChosenCategories((prev) => [...prev, category]);
    if (!mainCategories.includes(category)) {
      setMainCategories((prev) => [...prev, category]);
    }
  }

  function handlePubtypeClick(pubtype) {
    // Function to change pubtype state based on clicked pubtype tag
    setChosenTypes((prev) => [...prev, pubtype]);
    if (!mainTypes.includes(pubtype)) {
      setMainTypes((prev) => [...prev, pubtype]);
    }
  }

  // Format date to make it more readable
  const date = props.pubdate.split("T")[0];

  // Author list (author names separated by commas)
  const authors = props.authors.map((author, index) => {
    // author string: "author id"
    const splitName = author.split(" ");
    const authorId = splitName.pop();
    let authorName = splitName.join(" ").trim();
    if (authorName === "" || authorName === " ") {
      authorName = "NA";
    }
    if (index !== props.authors.length - 1) {
      authorName += ",";
    }
    if (authorName === ",") {
      console.log(authorId);
    }
    return (
      <span style={{ marginRight: "7px" }} key={index + authorId}>
        <span
          className="author"
          onClick={() => {
            setSearchInput(splitName.join(" "));
            props.setSearchTerm(splitName.join("+"));
            setAuthors(authorId);
          }}
        >
          {authorName}
        </span>
      </span>
    );
  });

  // Keywords list
  const keywords = props.keywords.map((keywordItem, index) => {
    if (!keywordItem) {
      return null;
    }
    // keywordItem string: "keyword id"
    let splitKey = keywordItem.split(" ");
    const keywordId = splitKey.pop();
    const keyword = splitKey.join(" ");
    let displayKey = keyword;
    if (splitKey.length > 2) {
      displayKey = splitKey.slice(0, 2).join(" ");
    }

    return (
      <span style={{ marginRight: "7px" }} key={index + keywordId}>
        <span
          className="keyword-tag"
          onClick={() => {
            setSearchInput(keyword);
            props.setSearchTerm(keyword.split(" ").join("+"));
          }}
        >
          {displayKey}
        </span>
      </span>
    );
  });

  // Category list
  const categories = props.categories.map((categoryItem, index) => {
    if (!categoryItem) {
      return null;
    }
    // categoryItem string: "category id"
    const splitCategory = categoryItem.split(" ");
    const categoryId = splitCategory.pop();
    const category = splitCategory.join(" ");
    let displayCategory = category;
    if (splitCategory.length > 2) {
      displayCategory = splitCategory.slice(0, 2).join(" ");
    }

    return (
      <span style={{ marginRight: "7px" }} key={index + categoryId}>
        <span
          className="category-tag"
          onClick={() => handleCategoryClick(category)}
        >
          {displayCategory}
        </span>
      </span>
    );
  });

  // Publication type list
  const pubtypes = props.pubtypes.map((pubtypeItem, index) => {
    // pubtypeItem string: "pubtype id"
    const splitPubtype = pubtypeItem.split(" ");
    const pubtypeId = splitPubtype.pop();
    const pubtype = splitPubtype.join(" ");

    return (
      <span style={{ marginRight: "7px" }} key={index + pubtypeId}>
        <span
          onClick={() => handlePubtypeClick(pubtype)}
          className="pubtype-tag"
        >
          {pubtype}
        </span>
      </span>
    );
  });

  return (
    <div className="article-info">
      <span>
        <a
          className="title"
          href={`https://pubmed.ncbi.nlm.nih.gov/${props.pmid}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.titleHighlight ? (
            // Modify HTML if title text is highlighted
            <div dangerouslySetInnerHTML={{ __html: props.titleHighlight }} />
          ) : (
            // Return regular title if no highlighting
            props.title
          )}
        </a>
      </span>
      <p>{authors}</p>
      <div className="date-journal">
        <span>{date}</span>
        <div className="journal-info">
          <span
            className="journal-name"
            onClick={() => {
              setJournalId(props.journalId);
              setJournalName(props.journal);
            }}
          >
            {props.journal}
          </span>
          <span>{props.volume !== "0" ? `Vol. ${props.volume}` : null}</span>
          <span>{props.issue !== "0" ? `Issue: ${props.issue}` : null}</span>
        </div>
      </div>
      <div className="article-ids">
        <span>
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/${props.pmid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`PMID: ${props.pmid}`}
          </a>
        </span>
        <span>
          <a
            href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${props.pmc}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.pmc ? `PMC: ${props.pmc}` : null}
          </a>
        </span>
        <span>
          <a
            href={`https://www.doi.org/${props.doi}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.doi ? `doi: ${props.doi}` : null}
          </a>
        </span>
      </div>
      <br />
      <div className="abstract">
        {props.abstract ? (
          <CollapseExpand>
            {props.abstractHighlight ? props.abstractHighlight : props.abstract}
          </CollapseExpand>
        ) : (
          <span>No abstract available.</span>
        )}
      </div>
      <br />
      <br />
      <ExpandTags>
        {categories[0] ? (
          <CollapseTags type="Categories">{categories}</CollapseTags>
        ) : null}
        <br />
        {keywords[0] ? (
          <CollapseTags type="Keywords">{keywords}</CollapseTags>
        ) : null}
        <br />
        <span className="ce-tag ce-pub">Type</span>
        <br />
        <br />
        {pubtypes}
        <br />
      </ExpandTags>
      <br />
      <hr />
    </div>
  );
}

export default Article;
