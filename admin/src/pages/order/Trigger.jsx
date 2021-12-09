import {
    useEffect,
   
    useState,
  } from "react";
import Order from "./Order";
import { userRequest } from "../../helper/requestMethods";
import {
 
    useLocation,
  } from "react-router-dom";

const Trigger = () => {
    const [order,setOrder]=useState([])
    const [amount,setAmount]=useState(0)
    const [address,setAddress]=useState({})
    const [id,setId]=useState("")
    const [userId,setUserId]=useState({})
    const location = useLocation();
    const orderId =
      location.pathname.split("/")[3];
      useEffect(()=>{
        const getOrder = async()=>{
            try {
                const response = await userRequest.get(`/orders/getorder/${orderId}`)
               
              
             setOrder(response.data.orders[0].products)
             setAmount(response.data.orders[0].amount)
             setAddress(response.data.orders[0].address)
             setUserId(response.data.orders[0].userId)
             setId(response.data.orders[0]._id)
            } catch (error) {
                console.log(error)
            }
        
        }
        getOrder()
     
},[])

   const trigger = ()=>{
      if(order.length !==0 && amount !== 0   ){
       
          return <Order
           orders ={order}
          address={address}
          Amount={amount}
          userId={userId}
          id={id}
          />
      }else{
          return <h1>error</h1>
      }
   }
 return trigger()
}

export default Trigger
