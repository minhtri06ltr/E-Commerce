import React from "react";
import { categories } from "../data";
import styled from "styled-components";
import CategoryItem from "./items/CategoryItem";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
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
