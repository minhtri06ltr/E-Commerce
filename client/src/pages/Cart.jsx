import { Add, Remove } from "@mui/icons-material";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import styled from "styled-components";
import Layout from "../components/layouts/Layout";
import { fold, mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";

import { userRequest } from "../helper/requestMethods";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {
  changeQuantity,
  deleteCartItem,
  getCartItems,
} from "../redux/apiRequest";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const Container = styled.div`

`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({
    padding: "0",
  })}
  ${fold({
    width:"110%"
  })}
`;
const Title = styled.h1`
  font-weight: 300px;
  text-align: center;
  ${mobile({
    marginTop: "20px",
  })}
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  font-weight: 700px;
  cursor: pointer;
  padding: 10px;
  border: ${(props) =>
    props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled"
      ? "black"
      : "transparent"};
  color: ${(props) =>
    props.type === "filled" && "white"};
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${mobile({
    flexDirection: "column",
  })}
`;
const TopTexts = styled.div`
  padding: 20px;
  ${mobile({
    display: "none",
  })}
`;
const TopText = styled.span`
  cursor: pointer;
  margin: 0 10px;
`;
const Info = styled.div`
  flex: 3;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column",
  })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${mobile({
    justifyContent: "center",
    margin: "20px",
  })}
`;
const ProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductQuantity = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
const ProductPrice = styled.div`
  font-size: 24px;
  margin-left: 35px;
  font-weight: 200;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) =>
    props.type === "total" && "500"};
  font-size: ${(props) =>
    props.type === "total" && "24px"};
`;
const Empty = styled.img`
margin: 0 auto;
    display: block;
    width: 40%;
`;
const Message = styled.span`
display: block;
    text-align: center;
    font-size: 30px;
  margin:10px 0 ;
    font-weight: 700;

`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const _exportPdf = () => {

  html2canvas(document.querySelector("#capture")).then(canvas => {
     document.body.appendChild(canvas);  // if you want see your screenshot in body.
     var imgData = canvas.toDataURL("image/jpeg", 1.0);
     const pdf = new jsPDF('p', 'pt', 'a4', false);
     pdf.addImage(imgData, 'JPEG', 0, 0, 600, 0, undefined, false);
     pdf.save("YouCart.pdf"); 
 });

}
const Cart = () => {
  const user = useSelector(state=>state.user)
  const KEY =
    "pk_test_51K0enCDzr6LNQ8Fc5SlrYCUSp2ORkjw2rLdlXP2j3UtWn2yz6BzSLa5i0fToYH7O6zyajt6291A8LMCJ1gsB9AQ100uMO2vlUq";
  const cart = useSelector((state) => state.cart);
  
  const history = useHistory();
  const dispatch = useDispatch();
  //state
  const [stripeToken, setStripeToken] =
    useState(null);
  //effect
  useEffect(() => {
    const makePaymentRequest = async () => {
      try {
        const response = await userRequest.post(
          "/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          },
        );

        history.push("/success", {
          stripeData:
            response.data.stripeResponse,
          cart: cart,
        });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makePaymentRequest();
  }, [stripeToken, cart.total, history]);
  useEffect(() => {
    getCartItems(dispatch);
  }, []);
  //function
  const onToken = (token) => {
    setStripeToken(token);
  };
  const handleDelete = (
    size,
    color,
    product_Id,
  ) => {
   
    let cartItem = {
      productId: product_Id,
      color: color,
      size: size,
    };
    console.log(cartItem)
    deleteCartItem(dispatch, cartItem);
  };
  const handleChange = (productChangeId,color,size,value)=>{
      let data={
        productId:productChangeId,
        color:color,
        size:size,
        value:value
      }
      changeQuantity(dispatch,data)
  }
  if(cart.products !=[]){
    console.log(cart.products.length)
  }
  return (
    <Container >
      <Layout>
        <Wrapper>
          <Title >YOUR BAG</Title>
          <Top>
            <Link to="/">
              <TopButton>
                COUNTINUE SHOPPING
              </TopButton>
            </Link>
            <TopTexts>
              <TopText>
                Shopping Bag({cart.quantity})
              </TopText>
              {/* <TopText>Your Wishlist(0)</TopText> */}
            </TopTexts>
           <Link to="/orders"> <TopButton type="filled">
              YOUR ORDERS
            </TopButton></Link>
          </Top>
          <Bottom id="capture" >
            <Info >
              {cart.products.length != 0 && user.currentUser ? cart.products.map(
                (product, index) => (
                  <div key={index}>
                    <ProductItem>
                      <ProductDetail>
                        <Image
                          src={product.img}
                        />
                        <Details>
                          <ProductName>
                            <b>Product: </b>
                            {product.title}
                          </ProductName>
                          <ProductId>
                            <b>ID: </b>
                            {product._id}
                          </ProductId>
                          <ProductColor
                            color={product.color}
                          />
                          <ProductSize>
                            <b>Size: </b>
                            {product.size}
                          </ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductQuantityContainer>
                          <Remove style={{cursor:"pointer"}} onClick = {e=>{
                            if(product.quantity <=1) return;
                          handleChange(product._id,product.color,product.size,-1)
                          }} />
                          <ProductQuantity>
                            {product.quantity}
                          </ProductQuantity>
                          <Add  style={{cursor:"pointer"}} onClick = {e=>{
                          handleChange(product._id,product.color,product.size,1)
                          }}/>
                          <ProductPrice>
                            ${" "}
                            {product.price *
                              product.quantity}
                          </ProductPrice>
                        </ProductQuantityContainer>
                      </PriceDetail>
                      <Button
                      style={{width:"auto",marginRight:"50px"}}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(
                            product.size,
                            product.color,
                            product._id,
                          );
                        }}
                      >
                        REMOVE
                      </Button>
                    </ProductItem>
                    <Hr />
                  </div>
                ),
              ) : (<>
              <Message>YOU DONT HAVE ANY PRODUCT IN CART</Message>
              <Empty src="https://measy.org/assets/images/bitmaps/no_orders.svg"/>
              </>)}
            </Info>
            <Summary >
              <SummaryTitle>
                ORDER SUMMARY
              </SummaryTitle>
              <SummaryItem>
                <SummaryItemText>
                  Subtotal
                </SummaryItemText>
                <SummaryItemPrice>
                  $ {cart.total}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>
                  Estimated Shipping
                </SummaryItemText>
                <SummaryItemPrice>
                  $ 0
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>
                  Shipping Discount
                </SummaryItemText>
                <SummaryItemPrice>
                  $ 0
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>
                  Total
                </SummaryItemText>
                <SummaryItemPrice>
                  $ {cart.total}
                </SummaryItemPrice>
              </SummaryItem>
          {user.currentUser && (   <> <StripeCheckout
                name="HOLO SHOP"
                //logo
                image="https://i.redd.it/5m2flzftc3e71.jpg"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                //stripe use percent
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              > <Button>CHECKOUT NOW</Button>
               
              </StripeCheckout>
             
              <Button style={{margin:"20px 0"}} onClick={e=>_exportPdf()}>Export PDF FOR THIS CART</Button>
              </>
              )}
            </Summary>
          </Bottom>
         
        </Wrapper>
      </Layout>
    </Container>
  );
};

export default Cart;
