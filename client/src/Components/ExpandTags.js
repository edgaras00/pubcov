import React, { useState } from "react";

function ExpandTags(props) {
  // Functional component to display article's tags

  // Show (true) / hide (false)
  const [expand, setExpand] = useState(false);

  return (
    <div>
      {expand ? (
        <span
          onClick={() => setExpand((prev) => !prev)}
          className="ce-button ce-button-tag"
        >
          {expand ? "Tags -" : "Tags +"}
        </span>
      ) : (
        <span onClick={() => setExpand((prev) => !prev)} className="ce-button">
          {expand ? "Tags -" : "Tags +"}
        </span>
      )}
      <br />
      {expand ? <div className="expanded-tags">{props.children}</div> : null}
    </div>
  );
}

export default ExpandTags;
