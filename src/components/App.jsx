import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Header from "./header/Header";
import Main from "./main/Main";

function App() {
  const [currentRead, setCurrentRead] = useState();

  useEffect(() => {
    const currentRead = JSON.parse(localStorage.getItem("currentRead"));
    if (currentRead) setCurrentRead(currentRead);
  }, []);

  return (
    <div>
      <Header book={currentRead} />
      <Main setCurrentRead={setCurrentRead} />
    </div>
  );
}

export default App;
