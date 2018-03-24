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
    searchResults: []
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

  moveBook = (book, currentShelf, newShelf) => {
    BooksAPI.update(book, newShelf).then((results) => {
      this.setState((previousState) => {
        var oldState = previousState;

        oldState[currentShelf].splice(oldState[currentShelf].indexOf(book), 1);
        book.shelf = newShelf;
        oldState[newShelf].push(book);


        return oldState;
      });
    });
  }

  removeBook = (book, currentShelf) => {
    BooksAPI.update(book, "none").then((results) => {
      this.setState((previousState) => {
        var oldState = previousState;

        oldState[currentShelf].splice(oldState[currentShelf].indexOf(book), 1);
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
        oldState.searchResults.splice(oldState.searchResults.indexOf(book), 1);
        return oldState;
      })
    })
  }

  queryChanged = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchResults) => {
        console.log(searchResults);
        this.setState({
          searchResults: searchResults.length ? searchResults : []
        });
      });
    } else {
      this.setState({
        searchResults: []
      });
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
            searchResults={this.state.searchResults}
            query={this.state.searchQuery}
            queryChanged={this.queryChanged}
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
