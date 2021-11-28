import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Pay from "./Pay";
import Success from "./Success";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pay" element={<Pay />} />
        <Route
          path="/success"
          element={<Success />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
