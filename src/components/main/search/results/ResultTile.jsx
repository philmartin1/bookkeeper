import React from "react";

function ResultTile(props) {
  let bookAuthors;
  if (props.book.volumeInfo.authors) {
    if (props.book.volumeInfo.authors.length === 2) {
      bookAuthors = `${props.book.volumeInfo.authors[0]}, ${props.book.volumeInfo.authors[1]}`;
    } else if (props.book.volumeInfo.authors.length > 2) {
      bookAuthors = `${props.book.volumeInfo.authors[0]}, ${props.book.volumeInfo.authors[1]}...`;
    } else {
      bookAuthors = props.book.volumeInfo.authors[0];
    }
  }

  function scrollTop() {
    const headerHeight = document.querySelector("header").offsetHeight;
    document.scrollingElement.scrollTo({
      top: headerHeight,
      behavior: "smooth",
    });
  }

  function openBook() {
    props.setSelectedBook(props.book);
    setTimeout(() => {
      scrollTop();
    }, 1);
  }

  return (
    <div className="search__results--item" onClick={openBook}>
      {props.book.volumeInfo.imageLinks && (
        <div>
          <img
            src={props.book.volumeInfo.imageLinks.thumbnail}
            alt={`front cover of ${props.book.volumeInfo.title}`}
          />
        </div>
      )}
      <div>
        <p className="search__results--item-title">
          {props.book.volumeInfo.title}
        </p>
        <p>{bookAuthors}</p>
      </div>
    </div>
  );
}

export default ResultTile;
