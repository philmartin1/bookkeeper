import React from "react";

function Book(props) {
  const {
    title,
    authors,
    imageLinks,
    description,
    categories,
    pageCount,
    averageRating,
  } = props.book;

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
    storedLibrary.collection.push(props.book);
    props.setLibrary(storedLibrary);
    setTimeout(() => {
      scrollToCollection();
    }, 1);
  }

  return (
    <div className="book">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button onClick={clearSelectedBook}>CLOSE</button>
        <button onClick={setCurrentlyReading}>Mark as currently reading</button>
        <button onClick={addToCollection}>Add to collection</button>
      </div>
      <div>
        <p className="search__results--item-title">{title}</p>
        {authors &&
          authors.map((author, index) => {
            return <p key={index}>{author}</p>;
          })}
        {imageLinks && (
          <div>
            <img src={imageLinks.thumbnail} alt={`front cover of ${title}`} />
          </div>
        )}
        <div>
          {description !== undefined && <p>Description: {description}</p>}
          {categories !== undefined && <p>Genre: {categories.join(", ")}</p>}
          {pageCount !== undefined && <p>Pages: {pageCount}</p>}
          {averageRating !== undefined && (
            <p>Average Rating: {averageRating}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Book;
