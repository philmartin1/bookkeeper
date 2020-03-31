import React from "react";

function CurrentBook() {
  return (
    <div className="current-book__container">
      <p>Currently Reading</p>
      {/*placeholder*/}
      <a href="/">
        <img
          src="http://books.google.com/books/content?id=AV9x8XakdV0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          alt="front cover of book <currently reading>"
          height="120px"
        />
      </a>
    </div>
  );
}
export default CurrentBook;
