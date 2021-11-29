import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products/:category"
          element={<ProductList />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/success"
          element={<Success />}
        />

        <Route
          path="/login"
          element={
            user.currentUser ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            user.currentUser ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
