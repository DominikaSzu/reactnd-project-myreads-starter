import React from 'react'
import Book from './Book'

class Shelf extends React.Component {
    
    render () {
        let { books } = this.props
        return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                <Book books={this.props.books} updateShelf={this.props.updateShelf} />
                </ol>
            </div>
        </div>            
    )}
}

export default Shelf