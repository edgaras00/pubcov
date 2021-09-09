import React, { useContext } from "react";
import Search from "./Search";
import logo from "../images/pc2.png";
import { ArticleContext } from "../Context/articleContext";

function Header(props) {
  // Functional header component

  const {
    setArticleData,
    setTotalPages,
    setNumberOfRows,
    setChosenCategories,
    setChosenTypes,
    setAbstractAvailable,
    setSearchInput,
    setAuthors,
    setJournalId,
    setSearchTerm,
  } = useContext(ArticleContext);

  const fetchDefaultData = () => {
    setChosenCategories([]);
    setChosenTypes([]);
    setAbstractAvailable(false);
    setSearchInput("");
    setAuthors("");
    setJournalId("");
    setSearchTerm("");
    const query = "http://localhost:5000/articles/";
    fetch(query)
      .then((res) => res.json())
      .then((data) => {
        setArticleData(data.data);
        if (data.count) {
          setNumberOfRows(data.count);
        }

        if (data.totalPages) {
          setTotalPages(data.totalPages);
        }
      });
  };

  return (
    <div className="header">
      <img src={logo} className="logo" onClick={fetchDefaultData} alt='logo'/>
      <div className="search-container">
        <Search
          setArticleData={props.setArticleData}
          setSearchTerm={props.setSearchTerm}
        />
      </div>
    </div>
  );
}

export default Header;
