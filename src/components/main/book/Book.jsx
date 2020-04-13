import React, { useState } from "react";

function Book(props) {
  const {
    title,
    authors,
    imageLinks,
    description,
    categories,
    pageCount,
    averageRating,
    publishedDate,
  } = props.book.volumeInfo;

  const [duplicateAdded, setDuplicateAdded] = useState(false);

  function scrollToSearch() {
    const headerHeight = document.querySelector("header").offsetHeight;
    document.scrollingElement.scrollTo({
      top: headerHeight,
      behavior: "smooth",
    });
  }

  function clearSelectedBook() {
    props.setSelectedBook();
    setTimeout(() => {
      scrollToSearch();
    }, 1);
  }

  function setCurrentlyReading() {
    const storedLibrary = JSON.parse(localStorage.getItem("library"));
    storedLibrary.currentlyReading = props.book;
    props.setLibrary(storedLibrary);
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToCollection() {
    const bodyHeight = document.querySelector("body").offsetHeight;
    const collectionHeight = document.querySelector(".collection").offsetHeight;
    const footerHeight = document.querySelector("footer").offsetHeight;
    document.scrollingElement.scrollTo({
      top: bodyHeight - collectionHeight - footerHeight,
      behavior: "smooth",
    });
  }

  function addToCollection() {
    const storedLibrary = JSON.parse(localStorage.getItem("library"));
    if (!storedLibrary.collection) storedLibrary.collection = [];

    let isDuplicate;

    storedLibrary.collection.forEach((item) => {
      if (item.id === props.book.id) {
        isDuplicate = true;
        setDuplicateAdded(true);
        setTimeout(() => {
          setDuplicateAdded(false);
        }, 1500);
      }
    });
    !isDuplicate && addBook(props.book);

    function addBook(book) {
      storedLibrary.collection.unshift(book);
      props.setLibrary(storedLibrary);
      setTimeout(() => {
        scrollToCollection();
      }, 1);
    }
  }

  return (
    <div className="book">
      {duplicateAdded && (
        <div className="book__duplicate-warning">
          This book is already in your collection.
        </div>
      )}
      <button className="book__close" onClick={clearSelectedBook}>
        X
      </button>
      <div className="book__details">
        <div className="book__details--main">
          <h3 className="book__details--title">{title}</h3>
          {authors &&
            authors.map((author, index) => {
              return (
                <p className="book__details--author" key={index}>
                  {author}
                </p>
              );
            })}
          {imageLinks && (
            <img
              src={imageLinks.thumbnail}
              alt={`front cover of ${title}`}
              width="200px"
            />
          )}
        </div>
        <div className="book__details--info">
          {description !== undefined && (
            <div>
              <h4 className="book__details--subheading">Description</h4>
              <p>{description}</p>
            </div>
          )}
          {categories !== undefined && (
            <div>
              <h4 className="book__details--subheading">Genre</h4>
              <p>{categories.join(", ")}</p>
            </div>
          )}
          {pageCount !== undefined && (
            <div>
              <h4 className="book__details--subheading">Pages</h4>
              <p>{pageCount}</p>
            </div>
          )}
          {averageRating !== undefined && (
            <div>
              <h4 className="book__details--subheading">Average Rating</h4>
              <p>{averageRating}</p>
            </div>
          )}
          {publishedDate !== undefined && (
            <div>
              <h4 className="book__details--subheading">Published</h4>
              <p>{publishedDate.slice(0, 4)}</p>
            </div>
          )}
        </div>
      </div>
      <div className="book__buttons-container">
        <button onClick={addToCollection}>Add to collection</button>
        <button onClick={setCurrentlyReading}>Mark as currently reading</button>
        <button onClick={clearSelectedBook}>Close</button>
      </div>
    </div>
  );
}

export default Book;
