import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import { CreateBook } from "./pages/book/CreateBook";
import { UpdateBook } from "./pages/book/UpdateBook";
import { Books } from "./pages/book/Books";
import AuthProvider from "./store/user/AuthProvider";
import BookProvider from "./store/book/BookProvider";
import { Signup } from "./pages/user/Signup";
import { Signin } from "./pages/user/Signin";

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/books" />
          </Route>
          <Route path="/books/:userId" exact>
            <Books />
          </Route>          
          <Route path="/books">
            <Books />
          </Route>
          <Route path="/create">
            <CreateBook />
          </Route>
          <Route path="/update/:bookId" exact>
            <UpdateBook />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
        </Switch>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;
