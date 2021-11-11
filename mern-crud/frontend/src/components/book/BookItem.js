import { Fragment } from "react";
import { Button, Stack, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";

export const BookItem = (props) => {
  const { userId } = useParams();
  return (
    <Fragment>
      <TableRow
        key={props.book.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="props.book">
          {props.book.title}
        </TableCell>
        <TableCell>{props.book.author}</TableCell>
        <TableCell>{props.book.price}</TableCell>
          {userId && (
            <TableCell align="right">
            <Stack spacing={2} direction="row">
              <Button
                component={Link}
                to={`/update/${props.book.id}`}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
              <Button
                onClick={props.onRemove}
                variant="outlined"
                color="primary"
              >
                Delete
              </Button>
            </Stack>
            </TableCell>
          )}
      </TableRow>
    </Fragment>
  );
};
