import React from "react";

function ResultsNav(props) {
  return (
    <div>
      <p>{`${props.totalResults} results`}</p>
      <div className="search__pagination">
        <button onClick={props.prevPage}>Previous page</button>
        <p>
          Page {props.page} of {Math.ceil(props.totalResults / 20)}
        </p>
        <button onClick={props.nextPage}>Next page</button>
      </div>
    </div>
  );
}

export default ResultsNav;
