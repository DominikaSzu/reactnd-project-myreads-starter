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
      query: '',
      searchedBook: [],
      foundBooks: true
  } 
    

    componentDidMount() {
        BooksAPI.getAll().then((books)=> {
            this.setState({ booksAll: books })
            
            books.map((book) => {
     
            if (book.imageLinks === undefined) {
                book.imageLinks.thumbnail = `url(http://via.placeholder.com/128x193?text=?)`
            }  
            
            if (book.authors === undefined) {
                book.authors = 'somebody'
            }
            })
        })
    }

    selectShelf = (book, event) => {
        //        this shows event target value and book chosen from control option on book component 
        const shelf = event.target.value
        const books = this.state.Allbooks
        
        book.shelf = shelf
        
        this.setState({
            books
        })
        
        
        const updatedBooks = BooksAPI.update(book, shelf)  
        updatedBooks.then(()=> {
            BooksAPI.getAll().then((books) =>
            this.setState({ booksAll: books })
        )})
    }

    updateQuery = (query) => {
        this.setState({ query: query });
        let searchedBooks = this.state.searchedBook;
        const booksAll = this.state.booksAll


        if (query !==  '') {
            BooksAPI.search(query).then((response) =>{
                response.map(resBook => {
                    this.setState({ foundBooks: true })

                    if (resBook.shelf === undefined) {
                    resBook.shelf = 'none';
                } 
                    if (resBook.imageLinks === undefined) {
                        resBook.imageLinks.thumbnail = `url(http://via.placeholder.com/128x193?text=?)`
                    }
                    
                    for (let i=0; i< booksAll.length; i++) {
                        if (resBook.id === booksAll[i].id) {
                            resBook.shelf = booksAll[i].shelf
                        }
                    }      
                    
                    this.setState({ searchedBook: response })
                })
            }).catch((error) => {
                this.setState({ foundBooks: false })
                this.setState({ searchedBook: [] })
            }) 
        } else {
            if (query === '') {
                this.setState({ searchedBook: [] })
            }
        }
    }


  render() {
      
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
                <Shelf shelfName="Currently Reading" books={currentlyReadingShelf} updateShelf={this.selectShelf} booksAll={this.state.booksAll} />
                <Shelf shelfName="Want to Read" books={wantToReadShelf} updateShelf={this.selectShelf} booksAll={this.state.booksAll} />
                <Shelf shelfName="Read" books={readShelf} updateShelf={this.selectShelf} booksAll={this.state.booksAll}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
    
    )}
        />
        
        <Route path="/search" render={(state) => (
           <SearchBook 
                query={this.state.query} 
                searchedBook={this.state.searchedBook} foundBooks={this.state.foundBooks}
                updateQuery={this.updateQuery.bind(this)}
                updateShelf={this.selectShelf.bind(this)}
        />                              
        )}/>
      </div>
    )
  }
}

export default BooksApp
