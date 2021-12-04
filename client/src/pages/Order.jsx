import Layout from "../components/layouts/Layout"
import {useEffect,useState} from 'react'
  import { fold,mobile } from "../responsive";
  import styled from 'styled-components'

import { userRequest } from "../helper/requestMethods";
import ProductItem from "../components/items/ProductItem";
import { useSelector } from "react-redux";

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
const Info = styled.div`
  flex: 3;
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
const Order = () => {
   const cart = useSelector(state=>state.cart)
     
    return (
        <Layout>
            <Info>
              {cart.products?.map(
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
                         
                          <ProductQuantity>
                            {product.quantity}
                          </ProductQuantity>
                       
                          <ProductPrice>
                            ${" "}
                            {product.price *
                              product.quantity}
                          </ProductPrice>
                        </ProductQuantityContainer>
                      </PriceDetail>
                      
                    </ProductItem>
                    <Hr />
                  </div>
                ),
              )}
            </Info>
        
        </Layout>
    )
}

export default Order
