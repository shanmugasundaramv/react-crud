import { useEffect, useReducer, useCallback } from 'react';
import { useHttpClient } from '../../hook/HttpHook';
import BookContext from './BookContext';

let defaultBookState = { items: []};

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const addedItems = state.items.concat(action.item);
      return { items: addedItems };
    case 'UPDATE':
      const existingItemIndex = state.items.findIndex(item => item.id === action.id);
      const updatedItems = state.items
      updatedItems[existingItemIndex] = { id: action.id, ...action.item }
      return { items: updatedItems };
    case 'REMOVE':
      const remainingItems = state.items.filter(item => item.id !== action.id);
      return { items: remainingItems};
    case 'REPLACE':
      return { items: action.items};
    default:
      return defaultBookState;
  }
};

const BookProvider = (props) => {
  const { sendRequest } = useHttpClient();
  const fetchBookData = useCallback(async() => {
  // const fetchBookData = async () => {
    // const responseData = await axios.get("http://localhost:8080/api/books").then((response) => {
    //   console.log('***** fetchBookData inside provider', response.data);
    //   return response.data.books;
    // });
    const response = await sendRequest(
      'http://localhost:8080/api/books'
    );
    const responseData = response.books;
    dispatchBookAction({ type: 'REPLACE', items: responseData });
  }, [sendRequest]);

  useEffect(()=> {
    fetchBookData() 
  },[fetchBookData]);

  const [bookState, dispatchBookAction] = useReducer(
    bookReducer,
    defaultBookState
  );
 
  const replaceItemsToBookHandler = (items) => {
    dispatchBookAction({ type: 'REPLACE', items: items});
  }; 

  const addItemToBookHandler = (item) => {
    dispatchBookAction({ type: 'ADD', item: item });
  }; 

  const updateItemToBookHandler = (item, id) => {
    dispatchBookAction({ type: 'UPDATE', item: item, id: id });
  };

  const removeItemFromBookHandler = (id) => {
    dispatchBookAction({ type: 'REMOVE', id: id });
  };

  const bookContext = {
    items: bookState.items,
    replaceItems: replaceItemsToBookHandler,
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
