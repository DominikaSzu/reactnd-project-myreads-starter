import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import Book from './Book'
import Shelf from './Shelf'

class BooksApp extends React.Component {
  
  state = {
      books: []
  } 
    

    componentDidMount() {
        BooksAPI.getAll().then((books)=> {
            this.setState({ books })
            console.log(books)
        })
    }

  render() {
      
      let books = this.state.books
      let currentlyReadingShelf = books.filter((book) => {book.shelf === 'currentlyReading'})
      let wantToReadShelf = books.filter((book) => {book.shelf === 'wantToRead'})
      let readShelf = books.filter((book) => {book.shelf === 'read'})
      
    return (
      <div className="app">
        
        <Route exact path="/" render={()=> (
        
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf shelfName="Currently Reading" currentShelf={currentlyReadingShelf}/>
                <Shelf shelfName="Want to Read" currentShelf={wantToReadShelf}/>
                <Shelf shelfName="Read" currentShelf={readShelf}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
    
    )}
        />
        
        <Route path="/search" component={SearchBook}
        />
      </div>
    )
  }
}

export default BooksApp
