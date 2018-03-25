import React from 'react';

class Book extends React.Component {

    changeBook = (newShelf) => {
        if (newShelf !== "none" && newShelf !== this.props.shelf) {
            this.props.moveBook(this.props.id, newShelf);
        } else if (newShelf === "none") {
            this.props.removeBook(this.props.id);
        }
    }

    render() {
        const authors = this.props.authors.map((author, index) => <div key={index} className="book-authors">{author}</div>);
        return (
            <div className="book" onClick={(e) => this.props.toggleSelection(this.props.id)}>
                <div className="book-top">
                    <div className={"book-cover" + (this.props.selected ? " selected" : "")} style={{ width: 128, height: 193, backgroundImage: "url(" + this.props.cover + ")" }}></div>
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
