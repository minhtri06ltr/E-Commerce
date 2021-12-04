import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { userRequest } from "../helper/requestMethods";
import { deleteCart } from "../redux/apiRequest";

const Success = () => {
  const location = useLocation();
  const history = useHistory()
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  console.log("data",data)
  const dispatch = useDispatch()
  console.log("cart",cart)
  const currentUser = useSelector(
    (state) => state.user.currentUser,
  );
  const [orderId, setOrderId] = useState(null);
  
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post(
          "/orders/add",
          {
            userId: currentUser._id,
            products: cart.products.map(
              (item) => ({
                productId: item._id,
                quantity: item._quantity,
              }),
            ),
            amount: cart.total,
            address: data.billing_details.address,
          },
        );
        setOrderId(res.data._id);
      } catch {}
    };
   
    
    data && createOrder();
    data && deleteCart(dispatch)
   
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button
        style={{ padding: 10, marginTop: 20 }}
        onClick={e=>{
          e.preventDefault();
          history.push('/')

        }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
