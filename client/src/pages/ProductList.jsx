import styled from "styled-components";
import Layout from "../components/layouts/Layout";
import Products from "../components/Products";
const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;
const ProductList = () => {
  return (
    <Container>
      <Layout>
        <Title>CPU</Title>
        <FilterContainer>
          <Filter>
            <FilterText>
              Filter Products
            </FilterText>
            <Select defaultValue="chooseColor">
              <Option
                disabled
                value="chooseColor"
              >
                Color
              </Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Purple</Option>
              <Option>Yellow</Option>
              <Option>Green</Option>
            </Select>
            <Select defaultValue="chooseSize">
              <Option disabled value="chooseSize">
                Size
              </Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products</FilterText>
            <Select defaultValue="chooseSortType">
              <Option value="chooseSortType">
                Newest
              </Option>
              <Option>Price (asc)</Option>
              <Option>Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products />
      </Layout>
    </Container>
  );
};

export default ProductList;
