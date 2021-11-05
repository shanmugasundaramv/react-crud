import { useContext } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import BookContext from "../store/BookContext";
import { BookItem } from "./BookItem";

export const BookList = () => {
  // const [books, setBooks] = useState([]);  
  const bookCtx = useContext(BookContext);
  const books = bookCtx.items;
  // const getBooks = () => {
  //   axios.get("http://localhost:4001/books").then((response) => {
  //     // console.log("****** ", response);
  //     setBooks(response.data);
  //     bookCtx.getItems({items: response.data});
  //   });
  // }

  // useEffect(() => {
  //   getBooks()
  // }, [bookCtx]);
  const bookItemRemoveHandler = (id) => {
    bookCtx.removeItem(id);
  }
  return (
    <Container maxWidth="lg" component="main">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
            <BookItem book={book} key={book.id} onRemove={bookItemRemoveHandler.bind(null, book.id)}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
