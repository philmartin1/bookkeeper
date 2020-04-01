import React from "react";

function Book(props) {
  function scrollTop() {
    const headerHeight = document.querySelector("header").offsetHeight;
    document.scrollingElement.scrollTo({
      top: headerHeight,
      behavior: "smooth"
    });
  }

  function clearSelectedBook() {
    props.setSelectedBook();
    setTimeout(() => {
      scrollTop();
    }, 10);
  }

  return (
    <div className="book">
      <div>
        <div className="booksearch__results--item">
          <p
            className="booksearch__pagination--button"
            onClick={clearSelectedBook}
          >
            CLOSE
          </p>
          <div>
            <p className="booksearch__results--item-title">
              {props.book.title}
            </p>
            {props.book.authors &&
              props.book.authors.map((author, index) => {
                return <p key={index}>{author}</p>;
              })}
            {props.book.imageLinks && (
              <div>
                <img
                  src={props.book.imageLinks.thumbnail}
                  alt={`front cover of ${props.book.title}`}
                />
              </div>
            )}
            {props.book.description !== undefined && (
              <p>Description: {props.book.description}</p>
            )}
            {props.book.mainCategory !== undefined && (
              <p>Genre: {props.book.mainCategory}</p>
            )}
            {props.book.pageCount !== undefined && (
              <p>Pages: {props.book.pageCount}</p>
            )}
            {props.book.averageRating !== undefined && (
              <p>Average Rating: {props.book.averageRating}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
