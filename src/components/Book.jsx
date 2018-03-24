import React from 'react';

class Book extends React.Component {

changeBook = (newShelf) => {
    if (newShelf !== "none") {
        this.props.moveBook(this.props.id, this.props.shelf, newShelf);
    } else {
        this.props.removeBook(this.props.id);
    }
}

    render() {
        // console.log("title", this.props.title)
        // console.log("authors", this.props.authors)
        const authors = this.props.authors.map((author, index) => <div key={index} className="book-authors">{author}</div>);
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
                <div className="book-title">{this.props.title}</div>
                {authors}
            </div>
        )
    }
}

export default Book;
