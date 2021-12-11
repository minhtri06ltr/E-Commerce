import styled from "styled-components";
import Layout from "../components/layouts/Layout";
import { Remove, Add } from "@mui/icons-material";
import { fold, mobile } from "../responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { publicRequest } from "../helper/requestMethods";
import { addToCart } from "../redux/apiRequest";
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    padding: 0,
    display: "flex ",
    flexDirection: "column",
  })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
  height: 120vh;
  ${mobile({
    height: "40vh ",
  })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({
    padding: "10px",
  })}
`;
const Title = styled.h1`
  font-weight: 500;
  display: block;
  text-align: center;
`;
const Description = styled.p`
  margin: 20px 0;
  display: block;
  text-align: center;
  ${mobile({
    margin: "15px 0",
  })}
`;
const Price = styled.span`
  font-weight: 500;
  font-size: 30px;
  display: block;
  text-align: center;
`;
const FilterContainer = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-around;
  ${fold({
    flexDirection: "column",
    alignItems: "center",
  })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  ${fold({
    margin: "10px auto",
  })}
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;
const QuantityContainer = styled.div`
  display: flex;
  font-weight: 700;
  align-items: center;
`;
const Quantity = styled.span`
  width: 30px;
  height: 30px;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
const Button = styled.button`
  padding: 15px 40px;
  color: white;
  cursor: pointer;
  font-weight: 700;
  background-color: teal;
  margin-top: 30px;
  ${mobile({
    marginBottom: "20px",
  })}
  &:hover {
    opacity: 0.85;
  }
`;
const ProductDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  //get product id from url
  const productId =
    location.pathname.split("/")[2];
  //state
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  //effect
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest.get(
          `/products/find/${productId}`,
        );
        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct(productId);
  }, [productId]);
  //event
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleAddToCart = () => {
    let cartItems = [
      {
        product: productId,
        quantity: quantity,
        color: color,
        size: size,
      },
    ];
    addToCart(dispatch, cartItems);
  };
  return (
    <>
      <Container>
        <Layout>
          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Description>
                {product.description}
              </Description>
              <Price>$ {product.price}</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  {product.color?.map(
                    (c, index) => (
                      <FilterColor
                        color={c}
                        key={index}
                        onClick={() =>
                          setColor(c)
                        }
                      />
                    ),
                  )}
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>

                  <FilterSize
                    onChange={(e) =>
                      setSize(e.target.value)
                    }
                  >
                    <FilterSizeOption
                      selected="true"
                      disabled="disabled"
                    >
                      Choose your size
                    </FilterSizeOption>
                    {product.size?.map(
                      (s, index) => (
                        <FilterSizeOption
                          key={index}
                        >
                          {s}
                        </FilterSizeOption>
                      ),
                    )}
                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <QuantityContainer>
                  <Remove
                    onClick={() =>
                      handleQuantity("dec")
                    }
                    style={{ cursor: "pointer" }}
                  />
                  <Quantity>{quantity}</Quantity>
                  <Add
                    onClick={() =>
                      handleQuantity("inc")
                    }
                    style={{ cursor: "pointer" }}
                  />
                </QuantityContainer>
                <Button onClick={handleAddToCart}>
                  ADD TO CART
                </Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
        </Layout>
      </Container>
      <div
        class="fb-comments"
        data-href="https://holo-shop.netlify.app"
        data-width=""
        data-numposts="5"
      ></div>
    </>
  );
};

export default ProductDetail;
