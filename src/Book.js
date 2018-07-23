import React from 'react'

class Book extends React.Component {
    render () {
        
        let { books } = this.props
        console.log(books)
        return (
            <div>
        { books.map((book) => (
        <li key={this.props.book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 
            `url(${ this.props.book.imageLinks.thumbnail })` }}></div>
                        <div className="book-shelf-changer">
                        <select value={this.props.book.shelf} onChange={(event)=> this.props.updateShelf(this.props.book, event)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                            </select>
                        </div>
                        </div>
                        <div className="book-title">{this.props.book.title}</div>
                        <div className="book-authors">{this.props.book.authors}</div>
                        </div>
</li> ))} 
      </div>      
    )}
}

export default Book