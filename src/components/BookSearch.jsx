import React, { useState } from "react";

function BookSearch() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState({});

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
    fetch(baseURL + searchInput + "&maxResults=20&" /*+ "startIndex=2"*/)
      .then(res => res.json())
      .then(res => setSearchResults(res))
      .catch(err => err);
  }

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
          <p>{`${searchResults.totalItems} results`}</p>
        )}
        <div className="booksearch__results">
          {searchResults.totalItems > 0 &&
            searchResults.items.map((result, index) => {
              return (
                <div
                  className="booksearch__results--item"
                  key={index}
                  id={index}
                >
                  {result.volumeInfo.imageLinks && (
                    <div>
                      <img
                        src={result.volumeInfo.imageLinks.thumbnail}
                        alt={`front cover of ${result.volumeInfo.title}`}
                      />
                    </div>
                  )}
                  <div>
                    <p className="booksearch__results--item-title">
                      {result.volumeInfo.title}
                    </p>
                    <p>
                      {result.volumeInfo.authors &&
                        result.volumeInfo.authors[0]}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default BookSearch;
