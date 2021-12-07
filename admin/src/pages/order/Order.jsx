
  import { userRequest } from "../../helper/requestMethods";
import "./order.css";


import { useHistory } from "react-router";


  export default function Order(props) {
console.log(props)
  const history = useHistory()

  const handleClick= async()=>{
try {
    const response = await userRequest.delete(`/orders/${props.id}`)
} catch (error) {
    console.log(error)
}
  }

   
    return (
      
      <div className="product">

        <div className="productTitleContainer">
          <h1 className="productTitle">Order</h1>
      
          <span>{props.id}</span>
            <button className="productAddButton" onClick = {e=>{
                e.preventDefault();
                handleClick()
                history.push("/orders")
            }}>
              Delete
            </button>
          
        </div>
        <div className="productTop">
          <div className="productTopLeft">
         <div style={{display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
         <div style={{margin:"20px auto",display:"block"}}>Amount: {props.Amount}</div>
          <div style={{margin:"20px auto",display:"block"}}>Address: {props.address.city}, {props.address.country}</div>
          <div style={{margin:"20px auto",display:"block"}}>Username: {props.userId.username}</div>
         </div>
          </div>
         {props.orders.map((product,index)=>( <div key={index} className="productTopRight">
            <div className="productInfoTop">
              <img
                src={product.img}
                alt=""
                className="productInfoImg"
              />
              <span className="productName">
               Name: {product.title}
              </span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">
                  Quantity
                </span>
                <span className="productInfoValue">
                {product.quantity}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">
                  Size:
                </span>
                <span className="productInfoValue">{product.size}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">
                  Color:
                </span>
                <span className="productInfoValue">{product.color}</span>
              </div>
  
              <div className="productInfoItem">
                <span className="productInfoKey">
                  Price:
                </span>
                <span className="productInfoValue">
                {product.price}
                </span>
              </div>
            </div>
          </div>))}
        </div>
       
      </div>
    );
  }
  