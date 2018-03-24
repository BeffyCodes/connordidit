import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book'

class Search extends React.Component {

    queryChanged = (query) => {
        this.props.queryChanged(query);
    }

    findBookFromID(id) {
        return 
    }

    addBook = (bookId, currentShelf, newShelf) => {
        this.props.addBook(this.props.searchResults.find((book) => book.id === bookId), newShelf);
    }

    render() {
        const books = this.props.searchResults.map((book) => (
            <li key={book.id}>
                <Book
                    id={book.id}
                    title={book.title}
                    authors={book.authors || []}
                    cover={(book.imageLinks && book.imageLinks.thumbnail) || ""}
                    shelf={this.props.shelfName}
                    moveBook={this.addBook}
                />
            </li>
        ));
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
                        <input
                            type="text"
                            // value={this.props.query}
                            onChange={(e) => this.queryChanged(e.target.value)}
                            placeholder="Search by title or author"
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;
