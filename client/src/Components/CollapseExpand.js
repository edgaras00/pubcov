import React, { useState } from "react";

function CollapseExpand(props) {
  // Functional component  that let's show / hide its content

  // Expand (true) / collapse (false)
  const [expand, setExpand] = useState(false);
  // Boolean to track if the element is hovered on
  const [isHovered, setIsHovered] = useState(false);

  // Collapsable / expandable content
  let content = expand ? props.children : props.children.slice(0, 200);

  return (
    <div>
      <span
        className={`ce-button expand-abstract ${
          isHovered ? "ab-hov-btn" : null
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setExpand((prev) => !prev)}
      >
        {expand ? "Abstract -" : "Abstract +"}
      </span>
      <br />
      <br />
      <div
        className={`abstract-container ${isHovered ? "ab-hov" : null}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {expand ? (
          <p
            className={`expanded-abstract`}
            // InnerHTML is needed to show highlighted search words
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className={`collapsed-abstract`}>
            {/* InnerHTML is needed to show highlighted search words */}
            <span dangerouslySetInnerHTML={{ __html: content }} /> ...
          </div>
        )}
      </div>
    </div>
  );
}

export default CollapseExpand;
