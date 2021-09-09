import React from "react";

function Checkbox({
  label,
  changeFilters,
  filterArray,
  type,
  addCategory,
  name,
  addType,
}) {
  // Functioncal component for category / publication filter checkboxes
  // const {setSelectedCategories} = useContext(ArticleContext);
  const categoryName = label.split("(")[0];

  // Capitalize labels
  const wordArr = label.split(" ");
  const capitalizedArr = wordArr.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });
  const capitalizedLabel = capitalizedArr.join(" ");

  function handleCheckboxChange(event) {
    if (event.target.checked) {
      changeFilters((prev) => [...prev, categoryName.trim()]);
      if (type === "category") {
        addCategory(name);
      } else if (type === "type") {
        addType(name);
      }
    } else {
      changeFilters((prev) =>
        prev.filter((category) => category.trim() !== categoryName.trim())
      );
    }
  }

  return (
    <label>
      <input
        type="checkbox"
        name="isChecked"
        // Check if chosen type/category array includes this value
        checked={filterArray.includes(categoryName.trim())}
        onChange={handleCheckboxChange}
      />{" "}
      <span>{capitalizedLabel}</span>
    </label>
  );
}

export default Checkbox;
