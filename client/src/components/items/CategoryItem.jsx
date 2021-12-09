import styled from "styled-components";
import { mobile,fold, galaxy } from "../../responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  flex: 1;
  height: 70vh;
  margin: 3px;
  position: relative;
  ${mobile({ margin: "3px 0" })}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ width: "30vh" })}
  ${fold({ width: "43vh" })}
  ${galaxy({ width: "60vh" })}
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.category}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
