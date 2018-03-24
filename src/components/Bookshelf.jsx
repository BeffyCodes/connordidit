import React from 'react';
import Book from './Book';

class Bookshelf extends React.Component {
  render() {
    const books = this.props.books.map((book) => (
      <li key={book.id}>
        <Book
          id={book.id}
          name={book.name}
          author={book.author}
          cover={book.cover}
          shelf={this.props.shelfName}
          moveBook={this.props.moveBook}
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
