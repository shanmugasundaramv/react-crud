import { Button, Box, Container, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { useHistory, useParams } from "react-router";
import axios from "axios";

import BookContext from "../../store/book/BookContext";
import AuthContext from "../../store/user/AuthContext";

export const Create = (props) => {
  const bookCtx = useContext(BookContext);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { bookId } = useParams();
  const bookDetail = bookCtx.items.find((item) => item.id === bookId);
  const [book, setBook] = useState(() => {
    return {
      title: bookDetail && bookDetail.title ? bookDetail.title : "",
      subtitle: bookDetail && bookDetail.subtitle ? bookDetail.subtitle : "",
      author: bookDetail && bookDetail.author ? bookDetail.author : "",
      price: bookDetail && bookDetail.price ? bookDetail.price : "",
      description:
        bookDetail && bookDetail.description ? bookDetail.description : "",
      creator: auth.userId,
    };
  });
  const { title, subtitle, author, price, description, creator } = book;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addBookData = async (book) => {
    const sendRequest = async () => {
      const response = await axios.post(
        "http://localhost:8080/api/books",
        book,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          }
        }
      );
      if (response.statusText) {
        bookCtx.addItem({ ...book });
        history.push(`/books/${auth.userId}`);
      } else {
        throw new Error("Adding book data failed.");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateBookData = async (book, bookId) => {
    const sendRequest = async () => {
      const response = await axios.put(
        `http://localhost:8080/api/books/${bookId}`,
        book,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          }
        }
      );
      if (response.statusText) {
        bookCtx.updateItem({ ...book }, bookId);
        history.push(`/books/${auth.userId}`);
      } else {
        throw new Error("Updating book data failed.");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error.message);
    }
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    const values = [title, subtitle, author, price, description];

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      if (bookId) {
        const book = {
          title,
          subtitle,
          author,
          price,
          description,
          creator,
        };
        updateBookData(book, bookId);
      } else {
        const book = {
          id: uuid(),
          title,
          subtitle,
          author,
          price,
          description,
          creator,
        };
        addBookData(book);
      }
    }
  };

  return (
    <Container maxWidth="sm" component="main">
      <Box
        component="form"
        onSubmit={formSubmissionHandler}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          type="text"
          id="title"
          name="title"
          label="Title"
          value={title}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          type="text"
          id="subtitle"
          name="subtitle"
          label="Subtitle"
          value={subtitle}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          type="text"
          id="author"
          name="author"
          label="Author"
          value={author}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          type="number"
          id="price"
          name="price"
          label="Price"
          value={price}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          type="text"
          id="description"
          name="description"
          label="Description"
          value={description}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
};
