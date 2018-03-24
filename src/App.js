import React from 'react';
import { Route, Link } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Bookshelf from './components/Bookshelf';
import Search from './components/Search';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [
      {
        id: 2,
        name: "To Kill A Mockingbird",
        author: "Harper Lee",
        cover: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
      }
    ],
    wantToRead: [
      {
        id: 1,
        name: "Ender's Game",
        author: "Orson Scott Card",
        cover: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
      }
    ],
    read: [
      {
        id: 5,
        name: "The Hobbit",
        author: "J.R.R Tolkein",
        cover: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
      }
    ]
  }

  moveBook = (bookId, oldShelf, newShelf) => {
    var bookToMove = {};
    var oldShelfArrayName;
    switch (oldShelf) {
      case "Currently Reading":
        oldShelfArrayName = "currentlyReading";
        break;
      case "Want to Read":
        oldShelfArrayName = "wantToRead";
        break;
      case "Read":
        oldShelfArrayName = "read";
        break;
    }

    this.setState((previousState) => {
      var oldState = previousState;
      for (let i = 0; i < oldState[oldShelfArrayName].length; i++) {
        if (oldState[oldShelfArrayName][i].id === bookId) {
          bookToMove = oldState[oldShelfArrayName][i];
          oldState[oldShelfArrayName].splice(i, 1);
        }
        
      }

      oldState[newShelf].push(bookToMove);
      console.log(oldState);

      return oldState;
    })

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
                  books={this.state.currentlyReading}
                  moveBook={this.moveBook}
                />
                <Bookshelf
                  shelfName="Want to Read"
                  books={this.state.wantToRead}
                  moveBook={this.moveBook}
                />
                <Bookshelf
                  shelfName="Read"
                  books={this.state.read}
                  moveBook={this.moveBook}
                />
              </div>
            </div>
          </div>
        )} />
        <Route path="/search" component={Search} />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp;
