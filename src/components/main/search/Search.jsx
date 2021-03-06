import React, { useState, useEffect } from "react";
import ResultTile from "./results/ResultTile";
import ResultsNav from "./results/ResultsNav";

function Search(props) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [page, setPage] = useState(1);
  const [resultsStart, setResultsStart] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [initialSearch, setInitialSearch] = useState(true);

  const baseURL = "https://www.googleapis.com/books/v1/volumes?q=";

  function handleInput(e) {
    setSearchInput(e.target.value);
  }

  function searchBooks(e) {
    e.preventDefault();
    fetch(`${baseURL}${searchInput}&maxResults=20`)
      .then((res) => res.json())
      .then((res) => setSearchResults(res))
      .catch((err) => err);
    setResultsStart(0);
    setPage(1);
    setInitialSearch(true);
    scrollToSearch();
  }

  function updatePage(start) {
    setInitialSearch(false);
    fetch(`${baseURL}${searchInput}&maxResults=20&startIndex=${start}`)
      .then((res) => res.json())
      .then((res) => setSearchResults(res))
      .catch((err) => err);
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
    scrollToSearch();
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
    scrollToSearch();
  }

  function scrollToSearch() {
    const headerHeight = document.querySelector("header").offsetHeight;
    const book = document.querySelector(".book");
    let bookHeight = 0;
    if (book) {
      bookHeight = book.offsetHeight + 64; // 64 is the margin of 1rem top and bottom
    }
    document.scrollingElement.scrollTo({
      top: headerHeight + bookHeight,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (initialSearch) {
      setTotalResults(searchResults.totalItems);
    }
  }, [initialSearch, searchResults.totalItems]);

  return (
    <div className="search">
      <form className="search__input" onSubmit={searchBooks}>
        <input
          type="text"
          value={searchInput}
          onChange={handleInput}
          placeholder="Search..."
          aria-label="Search input"
        />
        <button className="search__button" onClick={searchBooks}>
          Go
        </button>
      </form>
      <div>
        {searchResults.totalItems !== undefined && (
          <React.Fragment>
            <p className="search__results--total">{`${totalResults} results`}</p>
            {searchResults.totalItems > 0 && (
              <ResultsNav
                totalResults={totalResults}
                page={page}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            )}
          </React.Fragment>
        )}
        <div className="search__results">
          {searchResults.totalItems > 0 &&
            searchResults.items.map((result, index) => {
              return (
                <ResultTile
                  book={result}
                  key={index}
                  setSelectedBook={props.setSelectedBook}
                />
              );
            })}
        </div>
        <div>
          {searchResults.totalItems > 0 && (
            <ResultsNav
              totalResults={totalResults}
              page={page}
              nextPage={nextPage}
              prevPage={prevPage}
              scrollTop={scrollToSearch}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
