import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Header from "./header/Header";
import Main from "./main/Main";

function App() {
  const [library, setLibrary] = useState({});

  useEffect(() => {
    const storedLibrary = JSON.parse(localStorage.getItem("library"));
    if (storedLibrary) setLibrary(storedLibrary);
  }, []);

  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(library));
  }, [library]);

  return (
    <div>
      <Header
        currentlyReading={library.currentlyReading}
        setLibrary={setLibrary}
      />
      <Main setLibrary={setLibrary} library={library} />
      <footer>
        Created by{" "}
        <a
          href="https://philmartin.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Phil Martin
        </a>
      </footer>
    </div>
  );
}

export default App;
