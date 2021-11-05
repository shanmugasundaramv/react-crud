import { createContext } from 'react';

const BookContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  updateItem: (item) => {}
});
export default BookContext;