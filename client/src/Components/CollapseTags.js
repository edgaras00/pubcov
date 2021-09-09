import React, { useState } from "react";

function CollapseTags(props) {
  // Component to show / hide article tags

  // Show (true) / hide (false) tags
  const [expand, setExpand] = useState(false);
  console.log(props.type);

  //   Additional classes for styling
  let secondClass = props.type === "Categories" ? "category-ce" : "keyword-ce";
  let thirdClass = props.type === "Categories" ? "more-cat" : "more-key";

  return (
    <div>
      {/* Hide some tags if there are too many */}
      {props.children.length > 5 ? (
        <span
          className={`ce-tag ${secondClass} ${thirdClass}`}
          onClick={() => setExpand((prev) => !prev)}
        >
          {expand ? `${props.type} -` : `${props.type} +`}
        </span>
      ) : (
        <span className={`ce-tag ${secondClass}`}>{props.type}</span>
      )}
      <br />
      <div
        className={
          props.type === "Categories"
            ? "category-container"
            : "keyword-container"
        }
      >
        {expand ? props.children : props.children.slice(0, 5)}
      </div>
    </div>
  );
}

export default CollapseTags;
