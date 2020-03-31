import React from "react";
import PageTitle from "./PageTitle";
import CurrentBook from "./CurrentBook";

function Header() {
  return (
    <header>
      <PageTitle />
      <CurrentBook />
    </header>
  );
}

export default Header;
