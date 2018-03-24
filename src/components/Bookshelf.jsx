import React from 'react';
import Book from './Book';

class Bookshelf extends React.Component {
  findBookFromID(id) {
    return this.props.books.find((book) => book.id === id)
  }

  moveBook = (bookId, currentShelf, newShelf) => {
    this.props.moveBook(this.findBookFromID(bookId), this.props.shelfArrayName, newShelf);
  }

  removeBook = (bookId) => {
    this.props.removeBook(this.findBookFromID(bookId), this.props.shelfArrayName)
  }

  render() {
    const books = this.props.books.map((book) => (
      <li key={book.id}>
        <Book
          id={book.id}
          title={book.title}
          authors={book.authors || []}
          cover={(book.imageLinks && book.imageLinks.thumbnail) || ""}
          shelf={this.props.shelfName}
          moveBook={this.moveBook}
          removeBook={this.removeBook}
        />
      </li>
    ));

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
