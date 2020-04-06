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
      <footer style={footerStyle}>Created by Phil Martin</footer>
    </div>
  );
}

const footerStyle = {
  backgroundColor: "var(--light-purple)",
  bottom: "0",
  color: "var(--grey)",
  fontSize: "1.1rem",
  padding: "0.25em 0.5em",
  position: "fixed",
};

export default App;
