import Layout from "../components/layouts/Layout"
import {useEffect,useState} from 'react'
  import { fold,mobile,galaxy } from "../responsive";
  import styled from 'styled-components'

import { userRequest } from "../helper/requestMethods";
import { useSelector } from "react-redux";


const ProductName = styled.span``;
const ProductId = styled.span`
${fold({ display: "none" })}
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
 
  display: flex;
  align-items: center;
 
  ${mobile({
    justifyContent: "center",
    padding:"14px",
  })};

`;
const ProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductItem = styled.div`
height:218px;
  display: flex;
  justify-content: space-around;
  margin:10px 0 ;
  ${mobile({
    flexDirection: "column",
    marginTop:"54px",
    alignItems:"flex-end"
  })}
 
`;
const Wrapper = styled.div`
${galaxy({ margin:"20px 0",display:"block" })}
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
  height: 2px;
`;

const Message = styled.span`
display: block;
    text-align: center;
    font-size: 30px;
  margin:10px 0 ;
    font-weight: 700;

`;
const Container = styled.div`
${galaxy({ width: "83%",margin:"80px 0 " })}
`;
const ProductDetail = styled.div`
${fold({ flexDirection: "column" })}
  display: flex;
  ${galaxy({ flexDirection: "column",display:"contents" })}
`;
const Image = styled.img`
  width: 200px;
  height:200px;
  ${galaxy({ margin:"auto" })}
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const AddressTitle  = styled.span`
display: block;
    text-align: center;
    font-size: 30px;
  margin:10px 0 ;
    font-weight: 700;
`;
const Empty = styled.img`
margin: 0 auto;
    display: block;
    width: 40%;
`;
const AddressInfo = styled.div`
display: flex;
justify-content: space-evenly;
font-size: 20px;
`;
const OrderInfo = styled.div`
display: flex;
justify-content: center;
font-size: 20px;

`;
const OrderInfoItem = styled.span`
margin: 10px 10px;
`;
const Order = () => {
  const user= useSelector(state=>state.user)
  const [orders,setOrders] = useState([])
   useEffect(()=>{
    const getOrder = async ()=>{  try {
      let id = user.currentUser._id
        const response = await userRequest.get(`/orders/getorder/${id}`)
        setOrders(response.data.findOrder);
      } catch (error) {
        console.log(error)
      }}
      getOrder()

   },[])
    
    return (
        <Layout>
         { orders != [] && user.currentUser ? orders.map((item,index)=>(
           <Container key ={index}>
            <Container> 
              <AddressTitle > ADDRESS({index})</AddressTitle>
            
                <AddressInfo >
                    <span> City: {item.address.city} </span>
                    <span> Country: {item.address.country} </span>
                    <span> Line: {item.address.line1 ? item.address.line1 : "NaN"} </span>
                    <span> Postal: {item.address.postal_code} </span>

                </AddressInfo>
            
           <OrderInfo>
           <OrderInfoItem >Amout: {item.amount}$</OrderInfoItem>
            <OrderInfoItem>Status: {item.status}</OrderInfoItem>
           </OrderInfo>
             </Container>
            <Container>
           {item.products?.map(
                (product, index) => (
                  <Wrapper key={index} >
                    
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
                   
                  </Wrapper>
                ),
              )}</Container>
               <Hr style={{margin:"20px 0 "}} />
           </Container>
         ))
        : (<>
        <Message>YOU DONT HAVE ANY ORDER YET</Message>
        <Empty src="https://cdn.dribbble.com/users/1373705/screenshots/5854319/media/af9c4867c1ff6a62f580c27728f371b5.png?compress=1&resize=400x300"/>
        </>)
        }
        
        </Layout>
    )
}

export default Order
