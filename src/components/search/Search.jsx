import React, { useState, useEffect } from "react";
import ResultTile from "./results/ResultTile";
import ResultsNav from "./results/ResultsNav";

function BookSearch() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [page, setPage] = useState(1);
  const [resultsStart, setResultsStart] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [initialSearch, setInitialSearch] = useState(true);

  const baseURL = "https://www.googleapis.com/books/v1/volumes?q=";

  function activateSearchBox(e) {
    e.target.placeholder = "";
  }

  function deactivateSearchBox(e) {
    e.target.placeholder = "Search...";
  }

  function handleInput(e) {
    setSearchInput(e.target.value);
  }

  function searchBooks(e) {
    e.preventDefault();
    fetch(`${baseURL}${searchInput}&maxResults=20`)
      .then(res => res.json())
      .then(res => setSearchResults(res))
      .catch(err => err);
    setResultsStart(0);
    setPage(1);
    setInitialSearch(true);
  }

  function updatePage(start) {
    setInitialSearch(false);
    fetch(`${baseURL}${searchInput}&maxResults=20&startIndex=${start}`)
      .then(res => res.json())
      .then(res => setSearchResults(res))
      .catch(err => err);
  }

  function nextPage() {
    let newStart;
    if (resultsStart > totalResults - 20) {
      return;
    } else {
      newStart = resultsStart + 20;
      setResultsStart(newStart);
      setPage(page + 1);
      updatePage(newStart);
    }
  }

  function prevPage() {
    let newStart;
    if (resultsStart === 0) {
      return;
    } else if (resultsStart >= 20) {
      newStart = resultsStart - 20;
    } else {
      newStart = 0;
    }
    setResultsStart(newStart);
    updatePage(newStart);
    page > 1 ? setPage(page - 1) : setPage(1);
  }

  useEffect(() => {
    if (initialSearch) {
      setTotalResults(searchResults.totalItems);
    }
  }, [initialSearch, searchResults.totalItems]);

  return (
    <div className="booksearch">
      <form className="booksearch__input" onSubmit={searchBooks}>
        <input
          type="text"
          value={searchInput}
          onChange={handleInput}
          placeholder="Search..."
          onFocus={activateSearchBox}
          onBlur={deactivateSearchBox}
        />
      </form>
      <div>
        {searchResults.totalItems !== undefined && (
          <ResultsNav
            totalResults={totalResults}
            page={page}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
        <div className="booksearch__results">
          {searchResults.totalItems > 0 &&
            searchResults.items.map((result, index) => {
              return <ResultTile book={result.volumeInfo} key={index} />;
            })}
        </div>
        <div>
          {searchResults.totalItems !== undefined && (
            <ResultsNav
              totalResults={totalResults}
              page={page}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BookSearch;
