import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import axios from "axios";
const KEY =
  "pk_test_51K0enCDzr6LNQ8Fc5SlrYCUSp2ORkjw2rLdlXP2j3UtWn2yz6BzSLa5i0fToYH7O6zyajt6291A8LMCJ1gsB9AQ100uMO2vlUq";

const Pay = () => {
  const [stripeToken, setStripeToken] =
    useState(null);
  const onToken = (token) => {
    //receive token
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          },
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);
  return (
    <StripeCheckout
      name="Hol Shop"
      //logo
      image="https://i.redd.it/5m2flzftc3e71.jpg"
      billingAddress
      shippingAddress
      description="Your total is $20"
      //stripe use percent
      amount={2000}
      token={onToken}
      stripeKey={KEY}
    >
      <button>pay now</button>
    </StripeCheckout>
  );
};

export default Pay;
