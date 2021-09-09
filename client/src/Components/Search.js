import React, { useContext } from "react";
import { ArticleContext } from "../Context/articleContext";

function Search(props) {
  // Functional search component

  // React Context
  // Application state available to multiple components
  // State for search input element 
  const { searchInput, setSearchInput } = useContext(ArticleContext);

  function handleSearch() {
    // If there is search input
    if (searchInput) {
      props.setSearchTerm(searchInput);
      // If no search input
    } else {
      alert("Please fill out search field");
    }
  }

  return (
    <div className="search">
      <input
        className="searchbar"
        type="search"
        name="search"
        value={searchInput}
        placeholder="Search for publications"
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
}

export default Search;
