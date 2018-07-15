import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import App from './App.js'
import Book from './Book'

class SearchBook extends React.Component {
    state = {
        query: '',
        searchedBook: [],
        foundBooks: true
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        
        if (query !==  '') {
            BooksAPI.search(query).then((response) =>{
                response.map(resBook => {
                    this.setState({ foundBooks: true })
                    
                    if (resBook.shelf === undefined) {
                    resBook.shelf = 'none';
                } 
                    if (resBook.imageLinks === undefined) {
                        resBook.imageLinks = `url(http://via.placeholder.com/128x193?text=?)`
                    }
                    
                    this.setState({ searchedBook: response })
                })
            }).catch((error) => {
                this.setState({ foundBooks: false })
                this.setState({ searchedBook: [] })
            }) 
        }}

    render () {
            
            let searchedBooks = this.state.searchedBook
            console.log(searchedBooks)
            const searchTerms = [
                'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
            ]
            
        
        return (
            
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" 
            to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)
            
                }/>
              </div>
            </div>   

            <div className="search-books-results">
              <ol className="books-grid">
                  
                  { this.state.foundBooks ? 
                  (searchedBooks.map((book) => {   
                   <Book key={book.id} book={book} updateShelf={this.props.updateShelf} />
              })) : (
                  <div>
                    <img src='https://bit.ly/2L07YJN' height='200px' width='200px' style={{ textAlign: 'center' }}/>
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