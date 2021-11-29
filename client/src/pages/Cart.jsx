import { Add, Remove } from "@mui/icons-material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "../components/layouts/Layout";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../helper/requestMethods";
import { useNavigate } from "react-router-dom";
const KEY = process.env.STRIPE_KEY;
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({
    padding: "0",
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
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
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
        navigate("/success", {
          data: response.data.stripeResponse,
        });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makePaymentRequest();
  }, [stripeToken, cart.total, navigate]);
  //function
  const onToken = (token) => {
    setStripeToken(token);
  };
  return (
    <Container>
      <Layout>
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton>
              COUNTINUE SHOPPING
            </TopButton>
            <TopTexts>
              <TopText>Shopping Bag(2)</TopText>
              <TopText>Your Wishlist(0)</TopText>
            </TopTexts>
            <TopButton type="filled">
              CHECKOUT NOW
            </TopButton>
          </Top>
          <Bottom>
            <Info>
              {cart.products.map(
                (product, index) => (
                  <>
                    <ProductItem key={index}>
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
                          <Remove />
                          <ProductQuantity>
                            {product.quantity}
                          </ProductQuantity>
                          <Add />
                          <ProductPrice>
                            ${" "}
                            {product.price *
                              product.quantity}
                          </ProductPrice>
                        </ProductQuantityContainer>
                      </PriceDetail>
                    </ProductItem>
                    <Hr />
                  </>
                ),
              )}
            </Info>
            <Summary>
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
                  $ 5
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>
                  Shipping Discount
                </SummaryItemText>
                <SummaryItemPrice>
                  $ -5
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
              <StripeCheckout
                name="Hol Shop"
                //logo
                image="https://i.redd.it/5m2flzftc3e71.jpg"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                //stripe use percent
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        </Wrapper>
      </Layout>
    </Container>
  );
};

export default Cart;
