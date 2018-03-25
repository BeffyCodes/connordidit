import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css';
import Bookshelf from './components/Bookshelf';
import Search from './components/Search';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    // selectedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      var newState = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      };
      for (let i = 0; i < allBooks.length; i++) {
        newState[allBooks[i].shelf].push(allBooks[i]);
      }

      this.setState(newState);
    });
  }

  moveBook = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then((results) => {
      this.setState((previousState) => {
        var oldState = previousState;

        oldState[book.shelf].splice(oldState[book.shelf].indexOf(book), 1);
        book.shelf = newShelf;
        oldState[newShelf].push(book);


        return oldState;
      });
    });
  }

  removeBook = (book) => {
    BooksAPI.update(book, "none").then((results) => {
      this.setState((previousState) => {
        var oldState = previousState;

        oldState[book.shelf].splice(oldState[book.shelf].indexOf(book), 1);
        delete book.shelf;

        return oldState;
      });
    });
  }

  addBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((results) => {
      this.setState((previousState) => {
        var oldState = previousState;
        book.shelf = shelf;
        oldState[shelf].push(book);
        return oldState;
      })
    })
  }

  bookSelected = (book) => {
    if (this.state.selectedBooks.indexOf(book)) {

    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  shelfName="Currently Reading"
                  shelfArrayName="currentlyReading"
                  books={this.state.currentlyReading}
                  moveBook={this.moveBook}
                  removeBook={this.removeBook}
                />
                <Bookshelf
                  shelfName="Want to Read"
                  shelfArrayName="wantToRead"
                  books={this.state.wantToRead}
                  moveBook={this.moveBook}
                  removeBook={this.removeBook}
                />
                <Bookshelf
                  shelfName="Read"
                  shelfArrayName="read"
                  books={this.state.read}
                  moveBook={this.moveBook}
                  removeBook={this.removeBook}
                />
              </div>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <Search
            addBook={this.addBook}
          />
        )} />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp;
