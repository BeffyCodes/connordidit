import React from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI'
import Book from './Book'

class Search extends React.Component {
    state = {
        searchResults: [],
        searchQuery: ""
    }

    queryChanged = (query) => {
        this.setState({
            searchQuery: query
        });

        if (query.length) {
            search(query).then((searchResults) => {
                this.setState({
                    searchResults: searchResults.length ? searchResults : []
                });
            });
        }
    }

    addBook = (bookId, newShelf) => {
        this.props.addBook(this.state.searchResults.find((book) => book.id === bookId), newShelf);
    }

    render() {
        let searchResults;

        if (this.state.searchQuery.length) {
            searchResults = this.state.searchResults;
        } else {
            searchResults = [];
        }

        const books = searchResults.map((book) => (
            <li key={book.id}>
                <Book
                    id={book.id}
                    title={book.title}
                    authors={book.authors || []}
                    cover={(book.imageLinks && book.imageLinks.thumbnail) || ""}
                    moveBook={this.addBook}
                />
            </li>
        ));
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={this.state.searchQuery}
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
