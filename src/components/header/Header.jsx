import React from "react";
import PageTitle from "./PageTitle";
import CurrentlyReading from "./CurrentlyReading";

function Header(props) {
  return (
    <header>
      <PageTitle />
      <CurrentlyReading
        book={props.currentlyReading}
        setLibrary={props.setLibrary}
      />
    </header>
  );
}

export default Header;
