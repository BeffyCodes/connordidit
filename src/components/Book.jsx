import React from 'react';

class Book extends React.Component {

changeBook = (newShelf) => {
    this.props.moveBook(this.props.id, this.props.shelf, newShelf);
}

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.cover + ')' }}></div>
                    <div className="book-shelf-changer">
                        <select onClick={(e) => this.changeBook(e.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.name}</div>
                <div className="book-authors">{this.props.author}</div>
            </div>
        )
    }
}

export default Book;
