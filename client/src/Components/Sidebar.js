import React, { useContext } from "react";
import { ArticleContext } from "../Context/articleContext";
import Checkbox from "./Checkbox";
import FilterModal from "./FilterModal";
import { numberWithCommas } from "../utils/utils";
import BeatLoader from "react-spinners/BeatLoader";

function Sidebar({ categories, pubtypes }) {
  // Functional sidebar component

  // React Context
  // Application state available to multiple components
  // State for result filtering
  const {
    abstractAvailable,
    setAbstractAvailable,
    chosenCategories,
    setChosenCategories,
    chosenTypes,
    setChosenTypes,
    mainCategories,
    setMainCategories,
    setMainTypes,
    mainTypes,
    isLoading,
  } = useContext(ArticleContext);

  function addCategory(newCategory) {
    // Function to add a category to be displayed on the sidebar
    setMainCategories((prev) => [...prev, newCategory]);
  }

  function addType(newType) {
    // Function to add a publication type to be displayed on the sidebar
    setMainTypes((prev) => [...prev, newType]);
  }

  // Create all category checkbox components
  const categoryCheckboxes = categories.map((category, index) => {
    return (
      <Checkbox
        key={index + "C"}
        name={category.category}
        label={`${category.category} (${numberWithCommas(category.count)})`}
        filterArray={chosenCategories}
        changeFilters={setChosenCategories}
        type="category"
        addCategory={addCategory}
      />
    );
  });

  // Create all publication type checkbox components
  const pubTypeCheckboxes = pubtypes.map((pubtype, index) => {
    return (
      <Checkbox
        key={index + "PT"}
        name={pubtype.publication_type}
        label={`${pubtype.publication_type} (${numberWithCommas(
          pubtype.count
        )})`}
        filterArray={chosenTypes}
        changeFilters={setChosenTypes}
        addType={addType}
        type="type"
      />
    );
  });

  // Create checkbox components for main categories
  const mainCategoryCheckboxes = [];
  categories.forEach((category, index) => {
    if (mainCategories.includes(category.category)) {
      mainCategoryCheckboxes.push(
        <Checkbox
          key={index + "MC"}
          label={`${category.category} (${numberWithCommas(category.count)})`}
          filterArray={chosenCategories}
          changeFilters={setChosenCategories}
        />
      );
    }
  });

  // Create checkbox components for main publication types
  const mainTypeCheckboxes = [];
  pubtypes.forEach((pubtype, index) => {
    if (mainTypes.includes(pubtype.publication_type)) {
      mainTypeCheckboxes.push(
        <Checkbox
          key={index + "MP"}
          label={`${pubtype.publication_type} (${numberWithCommas(
            pubtype.count
          )})`}
          filterArray={chosenTypes}
          changeFilters={setChosenTypes}
        />
      );
    }
  });

  return (
    <div className="sidebar">
      <div className="loading-container">
        {/* React loading spinner */}
        <BeatLoader loading={isLoading} size={13} color="#147662" />
      </div>
      <div className="category-selection">
        <span className="filter-label">CATEGORIES</span>
        {mainCategoryCheckboxes}
      </div>
      <br />
      <div className="filter-button">
        {/* Filter modal for category filters */}
        <FilterModal label="Categories" filters={categoryCheckboxes} />
      </div>
      <br />
      <br />
      <div className="type-selection">
        <span className="filter-label">ARTICLE TYPES</span>
        {mainTypeCheckboxes}
      </div>
      <br />
      <div className="filter-button">
        {/* Filter modal for publication type filters */}
        <FilterModal label="Types" filters={pubTypeCheckboxes} />
      </div>
      <br />
      <br />
      <div>
        <label>
          <input
            className="abstract-check"
            type="checkbox"
            name="isAbstractChecked"
            checked={abstractAvailable}
            value={abstractAvailable}
            onChange={(event) => {
              if (event.target.checked) {
                setAbstractAvailable(true);
              } else {
                setAbstractAvailable(false);
              }
            }}
          />{" "}
          <span>Abstract available</span>
        </label>
      </div>
    </div>
  );
}

export default Sidebar;
