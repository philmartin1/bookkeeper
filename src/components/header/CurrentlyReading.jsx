import React, { useState } from "react";

function CurrentlyReading(props) {
  const [clearButton, setClearButton] = useState(false);

  function clearCurrentlyReading() {
    const storedLibrary = JSON.parse(localStorage.getItem("library"));
    delete storedLibrary.currentlyReading;
    props.setLibrary(storedLibrary);
    setClearButton(false);
  }

  function showClearButton() {
    setClearButton(true);
  }

  function hideClearButton() {
    setClearButton(false);
  }

  return (
    <div className="currently-reading">
      {props.book && (
        <div onMouseEnter={showClearButton} onMouseLeave={hideClearButton}>
          <p className="currently-reading__title">Currently Reading</p>
          <img
            src={props.book.imageLinks.thumbnail}
            alt={`front cover of ${props.book.title}`}
            height="120px"
          />
          {clearButton && (
            <button
              className="currently-reading__clear"
              onClick={clearCurrentlyReading}
            >
              X
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default CurrentlyReading;
