import React, { useState } from "react";

// React Context
// States that are accessible to multiple components
const ArticleContext = React.createContext();

function ArticleContextProvider(props) {
  // Array of article objects that are displayed as results on the page
  const [articleData, setArticleData] = useState([]);
  // Server url
  const [url, setUrl] = useState("http://localhost:5000/articles");
  // Should result articles have abstract available
  const [abstractAvailable, setAbstractAvailable] = useState(false);
  // Controlled search input value
  const [searchInput, setSearchInput] = useState("");
  // Selected author's id
  const [authors, setAuthors] = useState("");
  // Selected journal's id
  const [journalId, setJournalId] = useState("");
  // Selected journal's name
  const [journalName, setJournalName] = useState("");
  // Array of chosen category filters
  const [chosenCategories, setChosenCategories] = useState([]);
  // Array of chosen publication types
  const [chosenTypes, setChosenTypes] = useState([]);
  // Number of results (rows )fetched from the server database
  const [numberOfRows, setNumberOfRows] = useState(0);
  // Number of total available pages (paginated server/API data)
  const [totalPages, setTotalPages] = useState(0);
  // Search term used to look for article data
  const [searchTerm, setSearchTerm] = useState("");
  // Boolean value to track if data is still being fetched
  const [isLoading, setIsLoading] = useState(false);
  // Main categories that are shown on the sidebar
  const [mainCategories, setMainCategories] = useState([
    "epidemiology",
    "virology",
    "bioinformatics",
    "genomics",
    "molecular biology",
    "evolution",
    "biochemistry",
    "public-health",
  ]);
  // Main publication types that are shown on the sidebar
  const [mainTypes, setMainTypes] = useState([
    "Journal Article",
    "Review",
    "Meta-Analysis",
    "Randomized Controlled Trial",
    "Clinical Trial",
  ]);

  function changeUrl(url) {
    // Function to change url
    setUrl(url);
  }

  return (
    <ArticleContext.Provider
      value={{
        url,
        articleData,
        setArticleData,
        changeUrl,
        abstractAvailable,
        setAbstractAvailable,
        searchInput,
        setSearchInput,
        chosenCategories,
        setChosenCategories,
        chosenTypes,
        setChosenTypes,
        authors,
        setAuthors,
        journalId,
        setJournalId,
        journalName,
        setJournalName,
        setNumberOfRows,
        numberOfRows,
        totalPages,
        setTotalPages,
        searchTerm,
        setSearchTerm,
        mainCategories,
        setMainCategories,
        mainTypes,
        setMainTypes,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
}

export { ArticleContextProvider, ArticleContext };
