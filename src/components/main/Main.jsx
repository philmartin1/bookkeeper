import React, { useState } from "react";
import Book from "./book/Book";
import Search from "./search/Search";

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
    </main>
  );
}

export default Main;
