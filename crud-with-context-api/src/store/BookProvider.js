import axios from 'axios';
import { useEffect, useReducer } from 'react';

import BookContext from './BookContext';

let defaultBookState = {
  items: [
        {
            "id":"fea2b816-3071-49a7-9e9f-05a93311fd10",
            "title":"sssss JavaScript, Third Edition",
            "subtitle":"A Modern Introduction to Programming",
            "author":"Marijn Haverbeke",
            "price":472,
            "description":"JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications."
        },
        {
            "id":"42fc12fc-d745-4d96-a2e3-c969cde6b233",
            "title":"Practical Modern JavaScript",
            "subtitle":"Dive into ES6 and the Future of JavaScript",
            "author":"Nicolás Bevacqua",
            "price":334,
            "description":"To get the most out of modern JavaScript, you need learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details."
        },
        {
            "id":"8b4885af-d498-427f-8a4e-7cd09b4e0e14",
            "title":"Understanding ECMAScript 6",
            "subtitle":"The Definitive Guide for JavaScript Developers",
            "author":"Nicholas C. Zakas",
            "price":352,
            "description":"ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript."
        },
        {
            "id":"7578be17-8841-40b3-9c3c-edfd55e9f115",
            "title":"Speaking JavaScript",
            "subtitle":"An In-Depth Guide for Programmers",
            "author":"Axel Rauschmayer",
            "price":460,
            "description":"Like it or not, JavaScript is everywhere these days -from browser to server to mobile- and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position."
        },
        {
            "id":"76b64b16-c563-4056-8d29-fb6732853a55",
            "title":"Learning JavaScript Design Patterns",
            "subtitle":"A JavaScript and jQuery Developer's Guide",
            "author":"Addy Osmani",
            "price":254,
            "description":"With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
        },
        {
            "id":"25f16131-bcaf-4719-951d-83ea6ea8d09a",
            "title":"You Don't Know JS Yet",
            "subtitle":"Get Started",
            "author":"Kyle Simpson",
            "price":143,
            "description":"The worldwide best selling You Don't Know JS book series is back for a 2nd edition: You Don't Know JS Yet. All 6 books are brand new, rewritten to cover all sides of JS for 2020 and beyond."
        },
        {
            "id":"b2e63f1a-2f7e-4917-9f7a-51641c49cd2f",
            "title":"Pro Git",
            "subtitle":"Everything you neeed to know about Git",
            "author":"Scott Chacon and Ben Straub",
            "price":458,
            "description":"Pro Git (Second Edition) is your fully-updated guide to Git and its usage in the modern world. Git has come a long way since it was first developed by Linus Torvalds for Linux kernel development. It has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro."
        },
        {
            "id":"267de377-a6f6-4c1d-b53e-4c9a8a2e70a2",
            "title":"Rethinking Productivity in Software Engineering",
            "subtitle":"",
            "author":"Caitlin Sadowski, Thomas Zimmermann",
            "price":310,
            "description":"Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 \"Dagstuhl\" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity."
        }
    ]
  };

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const addedItems = state.items.concat(action.item);
      return { items: addedItems };
    case 'UPDATE':
      const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
      const updatedItems = state.items
      updatedItems[existingItemIndex] = { ...action.item }
      return { items: updatedItems };      
    case 'REMOVE':
      const remainingItems = state.items.filter(item => item.id !== action.id);
      return { items: remainingItems};
    default:
      return defaultBookState;
  }
};

const BookProvider = (props) => {
  // const fetchBookData = async () => {
  //   const responseData = await axios.get("http://localhost:4001/books").then((response) => {
  //     console.log('****** fetchBookData inside provider', response.data);
  //     return response.data;
  //   });
  //   defaultBookState.items = responseData;
  // };
  // useEffect(()=> {
  //   fetchBookData()
  // },[]);

  const [bookState, dispatchBookAction] = useReducer(
    bookReducer,
    defaultBookState
  );

  const addItemToBookHandler = (item) => {
    dispatchBookAction({ type: 'ADD', item: item });
  }; 

  const updateItemToBookHandler = (item) => {
    dispatchBookAction({ type: 'UPDATE', item: item });
  };   
  const removeItemFromBookHandler = (id) => {
    dispatchBookAction({ type: 'REMOVE', id: id });
  };

  const bookContext = {
    items: bookState.items,
    addItem: addItemToBookHandler,
    removeItem: removeItemFromBookHandler,
    updateItem: updateItemToBookHandler
  };

  return (
    <BookContext.Provider value={bookContext}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookProvider;
