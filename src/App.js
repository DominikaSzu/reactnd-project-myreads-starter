import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import Shelf from './Shelf'

class BooksApp extends React.Component {
  
  state = {
      booksAll: []
  } 
    

    componentDidMount() {
        BooksAPI.getAll().then((books)=> {
            this.setState({ booksAll: books })
        })
    }

    selectShelf (book, event) {
//        this shows event target value and book chosen from control option on book component 
        const shelf = event.target.value
        
        const updatedBooks = BooksAPI.update(book, shelf)  
        updatedBooks.then(BooksAPI.getAll().then((books) => {
            this.setState({ books: books })
            console.log(this.state.books)
        }))
    }

  render() {
      
      let books = this.state.booksAll
      let currentlyReadingShelf = this.state.booksAll.filter((book) => {return book.shelf === 'currentlyReading'})
      let wantToReadShelf = this.state.booksAll.filter((book) => 
      {return book.shelf === 'wantToRead'})
      let readShelf = this.state.booksAll.filter((book) => {return book.shelf === 'read'})

    return (
      <div className="app">
        
        <Route exact path="/" render={()=> (
        
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf shelfName="Currently Reading" currentShelf={currentlyReadingShelf} updateShelf={this.selectShelf.bind(this)}/>
                <Shelf shelfName="Want to Read" currentShelf={wantToReadShelf} updateShelf={this.selectShelf.bind(this)}/>
                <Shelf shelfName="Read" currentShelf={readShelf} updateShelf={this.selectShelf.bind(this)}/>
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
