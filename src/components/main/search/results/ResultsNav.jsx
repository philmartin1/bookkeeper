import React from "react";

function ResultsNav(props) {
  return (
    <div>
      <p>{`${props.totalResults} results`}</p>
      <div className="booksearch__pagination">
        <p className="booksearch__pagination--button" onClick={props.prevPage}>
          Previous page
        </p>
        <p>
          Page {props.page} of {Math.ceil(props.totalResults / 20)}
        </p>
        <p className="booksearch__pagination--button" onClick={props.nextPage}>
          Next page
        </p>
      </div>
    </div>
  );
}

export default ResultsNav;
