import React from "react";

class ResultTile extends React.Component {
  render() {
    let bookAuthors;
    if (this.props.book.authors) {
      if (this.props.book.authors.length === 2) {
        bookAuthors = `${this.props.book.authors[0]}, ${this.props.book.authors[1]}`;
      } else if (this.props.book.authors.length > 2) {
        bookAuthors = `${this.props.book.authors[0]}, ${this.props.book.authors[1]}...`;
      } else {
        bookAuthors = this.props.book.authors[0];
      }
    }

    return (
      <div className="booksearch__results--item">
        {this.props.book.imageLinks && (
          <div>
            <img
              src={this.props.book.imageLinks.thumbnail}
              alt={`front cover of ${this.props.book.title}`}
            />
          </div>
        )}
        <div>
          <p className="booksearch__results--item-title">
            {this.props.book.title}
          </p>
          <p>{bookAuthors}</p>
        </div>
      </div>
    );
  }
}

export default ResultTile;
