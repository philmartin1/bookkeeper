import React from "react";

function Header() {
  return (
    <header>
      <a className="page-title" href="/">
        <span className="page-title--first">book</span>
        <br />
        <span className="page-title--second">
          keep<span className="page-title--third">er</span>
        </span>
      </a>
    </header>
  );
}

export default Header;
