import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import BookContext from "../store/BookContext";
import { useHistory, useParams } from "react-router";

export const Create = (props) => {
  const bookCtx = useContext(BookContext);
  const history = useHistory();
  const bookId = useParams().bookId;
  const bookDetail = bookCtx.items.find((item) => item.id === bookId);   
  const [book, setBook] = useState(() => {
    return {
      title: bookDetail && bookDetail.title ? bookDetail.title : "",
      subtitle: bookDetail && bookDetail.subtitle ? bookDetail.subtitle : "",
      author: bookDetail && bookDetail.author ? bookDetail.author : "",
      price: bookDetail && bookDetail.price ? bookDetail.price : "",
      description: bookDetail && bookDetail.description ? bookDetail.description : "",
    };
  });
  const { title, subtitle, author, price, description } = book;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    const values = [title, subtitle, author, price, description];

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
        if(bookId) {
            const book = {
                id: bookId,
                title,
                subtitle,
                author,
                price,
                description,
              };
              bookCtx.updateItem({ ...book });
        } else {
            const book = {
                id: uuid(),
                title,
                subtitle,
                author,
                price,
                description,
              };
              bookCtx.addItem({ ...book });
        }
      history.push("/books");
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
