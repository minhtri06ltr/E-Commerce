import styled from "styled-components";
import Layout from "../components/layouts/Layout";
import { Remove, Add } from "@mui/icons-material";
import { mobile } from "../responsive";

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
  object-fit: cover;
  height: 90vh;
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
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
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
  return (
    <Container>
      <Layout>
        <Wrapper>
          <ImgContainer>
            <Image src="https://i.redd.it/5m2flzftc3e71.jpg" />
          </ImgContainer>
          <InfoContainer>
            <Title>SUI CHAN</Title>
            <Description>
              Lorem ipsum, dolor sit amet
              consectetur adipisicing elit.
              Cupiditate, iste! Lorem ipsum dolor
              sit amet consectetur adipisicing
              elit. Accusamus, sit.
            </Description>
            <Price>$ 20</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                <FilterColor color="black" />
                <FilterColor color="darkblue" />
                <FilterColor color="gray" />
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize>
                  <FilterSizeOption>
                    XS
                  </FilterSizeOption>
                  <FilterSizeOption>
                    S
                  </FilterSizeOption>
                  <FilterSizeOption>
                    M
                  </FilterSizeOption>
                  <FilterSizeOption>
                    L
                  </FilterSizeOption>
                  <FilterSizeOption>
                    XL
                  </FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <QuantityContainer>
                <Remove />
                <Quantity>1</Quantity>
                <Add />
              </QuantityContainer>
              <Button>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      </Layout>
    </Container>
  );
};

export default ProductDetail;
