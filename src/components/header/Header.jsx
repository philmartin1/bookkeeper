import React from "react";
import PageTitle from "./PageTitle";
import CurrentBook from "./CurrentBook";

function Header(props) {
  return (
    <header>
      <PageTitle />
      <CurrentBook book={props.book} />
    </header>
  );
}

export default Header;
