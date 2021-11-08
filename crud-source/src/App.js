import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import { CreateBook } from "./pages/CreateBook";
import { UpdateBook } from "./pages/UpdateBook";
import { Books } from "./pages/Books";
import BookProvider from "./store/BookProvider";

function App() {
  return (
    <BookProvider>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/books" />
        </Route>
        <Route path="/books" exact>
          <Books />
        </Route>
        <Route path="/create" exact>
          <CreateBook />
        </Route>
        <Route path="/update/:bookId" exact>
          <UpdateBook />
        </Route>
      </Switch>
    </BookProvider>
  );
}

export default App;
