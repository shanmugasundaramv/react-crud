import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router";
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
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";

import AuthContext from "../../store/user/AuthContext";
import BookContext from "../../store/book/BookContext";
import { useHttpClient } from "../../hook/HttpHook";
import { BookItem } from "./BookItem";

export const BookList = () => {
  const auth = useContext(AuthContext);
  const bookCtx = useContext(BookContext);
  const books = bookCtx.items;
  const { userId } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  let updatedBooks = books;
  if(userId) {
    updatedBooks = books.filter((book) => book.creator === userId);
  }
  // const getBookList = useCallback(async() => {
  //   const response = await sendRequest(
  //     'http://localhost:8080/api/books'
  //   );
  //   const responseData = response.books;
  //   bookCtx.replaceItemsToBookHandler(responseData);
  // },[bookCtx, sendRequest]);

  const bookItemRemoveHandler = async (id) => {
    clearError();
    try {
    await sendRequest(`http://localhost:8080/api/books/${id}`, 'DELETE', null, {
      Authorization: `Bearer ${auth.token}`
    });
    } catch(err) {

    }
    bookCtx.removeItem(id);
  }

  // useEffect(() => {
  //   getBookList()
  // }, [getBookList])

  return (
    <Container maxWidth="lg" component="main">
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {error && <Alert severity="error">{error}</Alert>}      
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
