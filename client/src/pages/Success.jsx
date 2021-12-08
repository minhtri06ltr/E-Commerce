import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { userRequest } from "../helper/requestMethods";
import { deleteCart } from "../redux/apiRequest";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import logo from '../img/logo.jpeg'
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
  console.log(typeof logo)
  var props = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "HOLO INVOICE",
    orientationLandscape: false,
    logo: {
        src: logo,
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        },
        
    },
    business: {
        name: "HOLO",
        address: "VIETNAME, HOCHIMINH, HOCMON district",
        phone: "(+84) 36 79 0 7374",
        email: "laptopdienthoai1@gmail.com",
        email_1: "facebook.com/violetevergarden",
        website: "holo.netlify.app",
    },
    contact: {
        label: "Invoice issued for:",
        name: data.billing_details.name,
        address: `${data.billing_details.address.country}, ${data.billing_details.address.city}`,
        phone: "NaN",
        email: currentUser.email,
        otherInfo: currentUser.username,
    },
    invoice: {
        label: "Invoice #: ",
        num: 1,
        invDate: new Date().toString(),
        invGenDate: "NaN",
        headerBorder: false,
        tableBodyBorder: false,
        header: ["#", "Product name","Size","Color", "Price", "Quantity", "Total"],
        table: cart.products.map((item,index)=>([
          index + 1,
            item.title,
            item.size,
            item.color,
            item.price,
            item.quantity,
            
            item.price*item.quantity
        ])),
        invTotalLabel: "Total:",
        invTotal: cart.total.toString(),
        invCurrency: "ALL",
        row1: {
            col1: 'VAT:',
            col2: '20',
            col3: '%',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        row2: {
            col1: 'SubTotal:',
            col2: (cart.total - cart.total*0.2).toString(),
            col3: 'ALL',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        invDescLabel: "Invoice Note",
        invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
};


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
                quantity: item.quantity,
                color:item.color,
                size:item.size,
                price:item.price,
                img:item.img,
                title:item.title

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
      <button
        style={{ padding: 10, marginTop: 20 }}
        onClick={e=>{
          e.preventDefault();
          history.push('/orders')

        }}
      >
        Check your order
      </button>
      <button
        style={{ padding: 10, marginTop: 20 }}
        onClick={e=>{
          e.preventDefault();
          const pdfObject = jsPDFInvoiceTemplate(props); 

        }}
      >
        Export your order
      </button>

    </div>
  );
};

export default Success;
