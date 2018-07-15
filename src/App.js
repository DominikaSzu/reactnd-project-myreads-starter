import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import Shelf from './Shelf'

class BooksApp extends React.Component {
  
  state = {
      booksAll: [], 
  } 
    

    componentDidMount() {
        BooksAPI.getAll().then((books)=> {
            this.setState({ booksAll: books })
        })
    }

    selectShelf = (book, event) => {
//        this shows event target value and book chosen from control option on book component 
        const shelf = event.target.value
        const updatedBook = BooksAPI.update(book, shelf)  
        updatedBook.then(BooksAPI.getAll().then((books) => {
            this.setState({ books: books })
        }))
    }

  render() {
      
      let books = this.state.booksAll
      let currentlyReadingShelf = books.filter((book) => {return book.shelf === 'currentlyReading'})
      let wantToReadShelf = books.filter((book) => 
      {return book.shelf === 'wantToRead'})
      let readShelf = books.filter((book) => {return book.shelf === 'read'})
      console.log(currentlyReadingShelf)
      console.log(wantToReadShelf)
      console.log(readShelf)
      console.log(books, books[0])
    return (
      <div className="app">
        
        <Route exact path="/" render={()=> (
        
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf shelfName="Currently Reading" currentShelf={currentlyReadingShelf} updateShelf={this.selectShelf}/>
                <Shelf shelfName="Want to Read" currentShelf={wantToReadShelf} updateShelf={this.selectShelf}/>
                <Shelf shelfName="Read" currentShelf={readShelf} updateShelf={this.selectShelf}/>
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
