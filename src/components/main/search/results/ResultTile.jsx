import React from "react";

function ResultTile(props) {
  let bookAuthors;
  if (props.book.authors) {
    if (props.book.authors.length === 2) {
      bookAuthors = `${props.book.authors[0]}, ${props.book.authors[1]}`;
    } else if (props.book.authors.length > 2) {
      bookAuthors = `${props.book.authors[0]}, ${props.book.authors[1]}...`;
    } else {
      bookAuthors = props.book.authors[0];
    }
  }

  function scrollTop() {
    const headerHeight = document.querySelector("header").offsetHeight;
    document.scrollingElement.scrollTo({
      top: headerHeight,
      behavior: "smooth"
    });
  }

  function openBook(e) {
    props.setSelectedBook(props.book);
    setTimeout(() => {
      scrollTop();
    }, 10);
  }

  return (
    <div className="booksearch__results--item" onClick={openBook}>
      {props.book.imageLinks && (
        <div>
          <img
            src={props.book.imageLinks.thumbnail}
            alt={`front cover of ${props.book.title}`}
          />
        </div>
      )}
      <div>
        <p className="booksearch__results--item-title">{props.book.title}</p>
        <p>{bookAuthors}</p>
      </div>
    </div>
  );
}

export default ResultTile;
