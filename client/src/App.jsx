import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Search from "./pages/Search";
import Order from "./pages/Order";
const App = () => {
  const user = useSelector(
    (state) => state.user.currentUser,
  );
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/orders">
          <Order />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? (
            <Redirect to="/" />
          ) : (
            <Register />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
