import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Letter from "../components/Letter";
import Footer from "../components/Footer";
import {
  RemoveCircleOutline,
  AddCircleOutline,
} from "@mui/icons-material";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 90vh;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
`;
const Title = styled.h1`
  font-weight: 500;
`;
const Description = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  font-weight: 500;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
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
  padding: 15px;

  cursor: pointer;
  font-weight: 500;
  background-color: teal;

  &:hover {
    opacity: 0.7;
  }
`;
const ProductDetail = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src="https://i.redd.it/5m2flzftc3e71.jpg" />
        </ImgContainer>
        <InfoContainer>
          <Title>SUI CHAN</Title>
          <Description>
            Lorem ipsum, dolor sit amet
            consectetur adipisicing elit.
            Cupiditate, iste!
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
              <RemoveCircleOutline
                style={{ color: "red" }}
              />
              <Quantity>1</Quantity>
              <AddCircleOutline
                style={{ color: "teal" }}
              />
            </QuantityContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Letter />
      <Footer />
    </Container>
  );
};

export default ProductDetail;
