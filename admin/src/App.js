import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,

  
} from "react-router-dom";

import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import OrderList from "./pages/orderList/OrderList";

import { Redirect } from "react-router-dom";
import Trigger from "./pages/order/Trigger";

function App() {
 
  const user = useSelector((state) => state.user);
  
const redirectWithTime = ()=>{
  return <Redirect to='/'/>
}
  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user.currentUser ? 
           redirectWithTime()
           : (
            <Login />
          )}
        </Route>
        {user.currentUser ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />

              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/order/getorder/:orderId">
                <Trigger />
              </Route>
              <Route path="/orders">
                <OrderList />
              </Route>
            
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
