import React from 'react';
import Book from './Book';

class Bookshelf extends React.Component {
  findBookFromID(id) {
    return this.props.books.find((book) => book.id === id)
  }

  moveBook = (bookId, newShelf) => {
    this.props.moveBook(this.findBookFromID(bookId), newShelf);
  }

  removeBook = (bookId) => {
    this.props.removeBook(this.findBookFromID(bookId));
  }

  toggleSelection = (bookId) => {
    this.props.toggleSelection(this.findBookFromID(bookId));
  }

  // bulkMove = () => {

  // }

  render() {
    const books = this.props.books.map((book) => (
      <li key={book.id}>
        <Book
          id={book.id}
          title={book.title}
          authors={book.authors || []}
          cover={(book.imageLinks && book.imageLinks.thumbnail) || ""}
          shelf={book.shelf}
          selected={book.selected}
          moveBook={this.moveBook}
          removeBook={this.removeBook}
          toggleSelection={this.toggleSelection}
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
