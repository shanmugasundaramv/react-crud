import { useContext } from "react";
import {
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useHistory, useParams } from "react-router";
import axios from "axios";

import AuthContext from "../../store/user/AuthContext";
import BookContext from "../../store/book/BookContext";
import { BookItem } from "./BookItem";

export const BookList = () => {
  const auth = useContext(AuthContext);
  const bookCtx = useContext(BookContext);
  const books = bookCtx.items;
  const { userId } = useParams();
  let updatedBooks = books;
  if(userId) {
    updatedBooks = books.filter((book) => book.creator === userId);
  }
  const bookItemRemoveHandler = async (id) => {
    // console.log('****** checking ID ', id);
    await axios.delete('http://localhost:8080/api/books/'+id,
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      }
    })
    bookCtx.removeItem(id);
  }

  return (
    <Container maxWidth="lg" component="main">
      { (!updatedBooks || updatedBooks.length === 0) && (
      <Card sx={{ minWidth: 275 }}>
        <CardContent align="center">
          There is no books available now
          </CardContent>
      </Card>
      )}
      { updatedBooks.length > 0 && (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Price</TableCell>
              {userId && <TableCell>Actions</TableCell> }
            </TableRow>
          </TableHead>
          <TableBody>
            {updatedBooks.map((book) => (
            <BookItem book={book} key={book.id} onRemove={bookItemRemoveHandler.bind(null, book.id)}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}
    </Container>
  );
};
