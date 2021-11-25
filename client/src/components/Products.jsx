import styled from "styled-components";
import { popularProducts } from "../data";
import ProductItem from "./items/ProductItem";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = () => {
  return (
    <Container>
      {popularProducts.map((item, index) => (
        <ProductItem key={index} item={item} />
      ))}
    </Container>
  );
};

export default Products;
