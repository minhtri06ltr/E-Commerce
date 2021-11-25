import { categories } from "../data";
import styled from "styled-components";
import CategoryItem from "./items/CategoryItem";
import { mobile } from "../responsive";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0",flexDirection:"column" })}
`;
const Categories = () => {
  return (
    <Container>
      {categories.map((item, index) => (
        <CategoryItem key={index} item={item} />
      ))}
    </Container>
  );
};

export default Categories;
