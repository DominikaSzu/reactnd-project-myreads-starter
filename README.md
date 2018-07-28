# MyReads Project

This is the application which gives the user a possibility to organize his reading plans.

It contains three shelves, on which the user can segregate the books:
* Currently Reading: for the books the user is reading at the moment,
* Want To Read: to track all the books he is planning to read in the future,
* Read: for all the books he has already read.

What's more, the application gives the possibility not only to organize the books but also to search for another.

In the right bottom corner, the user can find a "+" which will give him a possibility to search for new positions and add them to one of the three shelves.

## TL;DR

To use the application you should:

* clone the repository `https://github.com/DominikaSzu/reactnd-project-myreads-starter`
* change the directory to this project
* install all project dependencies with `npm install`
* start the development server with `npm start`

## Backend Server

There is a backend server available. The file [`BooksAPI.js`](src/BooksAPI.js) contains the methods used for operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Code Dependencies

This project was created thanks to the following code dependencies:
* [Create React App](https://github.com/facebookincubator/create-react-app).
* starter code template done by Udacity
* React framework