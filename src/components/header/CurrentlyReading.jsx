import React from "react";

function CurrentlyReading(props) {
  return (
    <div className="current-book__container">
      {props.book && (
        <div>
          <p>Currently Reading</p>
          <a href="/">
            {" "}
            {/* add react router? */}
            <img
              src={props.book.imageLinks.thumbnail}
              alt={`front cover of ${props.book.title}`}
              height="120px"
            />
          </a>
        </div>
      )}
    </div>
  );
}
export default CurrentlyReading;
