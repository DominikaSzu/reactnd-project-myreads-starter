import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import App from './App.js'
import Book from './Book'
import Shelf from './Shelf'

class SearchBook extends React.Component {

    render () {
            
            let searchedBooks = this.props.searchedBook
            let query = this.props.query
            
            if (query === '') {
                searchedBooks= []
            }

            
        return (
            
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" 
            to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.props.updateQuery(event.target.value)
                }/>
              </div>
            </div>   

            <div className="search-books-results">
              <ol className="books-grid">
                  
                  { this.props.foundBooks ? 
                  ( <div>
                    <Shelf books={searchedBooks} updateShelf={this.props.updateShelf} />
                  </div>
              ) : (
                  <div>
                    <img src='https://bit.ly/2L07YJN' height='200px' width='200px' style={{ textAlign: 'center' }} alt="Sad face"/>
                  <p style={{ textAlign: 'center' }}>Sorry, no results found.</p>
                  </div>
              )}
              </ol>
            </div>
          </div>
          
        )
    }
}

export default SearchBook