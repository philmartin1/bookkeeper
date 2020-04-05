import React, { useState, useEffect } from "react";

function Collection(props) {
  const [collection, setCollection] = useState();

  useEffect(() => {
    setCollection(props.library.collection);
  }, [props.library]);

  function scrollTop() {
    const headerHeight = document.querySelector("header").offsetHeight;
    document.scrollingElement.scrollTo({
      top: headerHeight,
      behavior: "smooth",
    });
  }

  function openBook(e) {
    const index = e.target.closest("div").id;
    props.setSelectedBook(collection[index]);
    setTimeout(() => {
      scrollTop();
    }, 1);
  }

  function setCurrentlyReading(e) {
    const index = e.target.getAttribute("book-index");
    const storedLibrary = JSON.parse(localStorage.getItem("library"));
    const book = storedLibrary.collection[index];
    storedLibrary.currentlyReading = book;
    props.setLibrary(storedLibrary);
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removeFromCollection(e) {
    const index = e.target.getAttribute("book-index");
    const storedLibrary = JSON.parse(localStorage.getItem("library"));
    const book = storedLibrary.collection[index];
    const newCollection = storedLibrary.collection.filter((item) => {
      return item === book ? false : true;
    });
    storedLibrary.collection = newCollection;
    if (!storedLibrary.collection.length) {
      delete storedLibrary.collection;
    }
    props.setLibrary(storedLibrary);
  }

  return (
    <div className="collection" style={{ textAlign: "center" }}>
      <h2>Collection</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {collection &&
          collection.map((book, index) => {
            return (
              <div key={index} id={index} style={itemStyle}>
                {book.imageLinks && (
                  <img
                    src={book.imageLinks.thumbnail}
                    alt={`front cover of ${book.title}`}
                    width="150px"
                    onClick={openBook}
                  />
                )}
                <div>
                  <button
                    book-index={index}
                    style={buttonStyle}
                    onClick={setCurrentlyReading}
                  >
                    Mark as currently reading
                  </button>
                  <br />
                  <button
                    book-index={index}
                    style={buttonStyle}
                    onClick={removeFromCollection}
                  >
                    Remove from collection
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const buttonStyle = {
  fontSize: "0.75rem",
  margin: "0.25rem 0",
  width: "150px",
};

const itemStyle = {
  alignItems: "center",
  color: "var(--purple)",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "0.25rem",
  padding: "0.75rem",
};

export default Collection;
