import React, { useState } from "react";
import Book from "./book/Book";
import Search from "./search/Search";
import Collection from "./Collection";

function Main(props) {
  const [selectedBook, setSelectedBook] = useState();

  return (
    <main>
      {selectedBook && (
        <Book
          book={selectedBook}
          setSelectedBook={setSelectedBook}
          setLibrary={props.setLibrary}
        />
      )}
      <Search setSelectedBook={setSelectedBook} />
      {props.library.collection && (
        <Collection
          library={props.library}
          setSelectedBook={setSelectedBook}
          setLibrary={props.setLibrary}
        />
      )}
    </main>
  );
}

export default Main;
