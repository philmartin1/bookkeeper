import React, { useState } from "react";
import Book from "./book/Book";
import Search from "./search/Search";

function Main() {
  const [selectedBook, setSelectedBook] = useState();

  return (
    <main>
      {selectedBook && (
        <Book book={selectedBook} setSelectedBook={setSelectedBook} />
      )}
      <Search setSelectedBook={setSelectedBook} />
    </main>
  );
}

export default Main;
