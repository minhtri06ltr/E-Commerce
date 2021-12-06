import { useLocation } from "react-router";
import { useState } from "react";
import styled from "styled-components";
import Layout from "../components/layouts/Layout";
import Products from "../components/Products";
import { mobile ,galaxy} from "../responsive";
const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
  text-align: center;
  ${galaxy({display:"block", marginRight:"70px"})}
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${galaxy({ flexDirection: "column",width:"80%"  })}
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({
    margin: "0 20px",
    display: "flex",
    flexDirection: "column",
  })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({
    marginRight: "0 ",
  })}
  ${galaxy({display:"block",margin:"0 auto"  })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({
    margin: "10px 0 ",
  })}
`;
const Option = styled.option`
  text-align: center;
`;
const ProductList = () => {
  const location = useLocation();
  //get category from url
  const category =
    location.pathname.split("/")[2];
  //state
  const [filters, setFilters] = useState({});

  const [sort, setSort] = useState("newest");
  //event function
  const handleFilters = (e) => {
    const value = e.target.value;
    //get filter value
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  return (
    <Container>
      <Layout>
        <Title>{category.toUpperCase()}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>
              Filter Products
            </FilterText>
            <Select
              defaultValue="chooseColor"
              onChange={handleFilters}
              name="color"
            >
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
            <Select
              defaultValue="chooseSize"
              onChange={handleFilters}
              name="size"
            >
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
            <Select
              defaultValue="chooseType"
              onChange={(e) =>
                setSort(e.target.value)
              }
            >
              <Option disabled value="chooseType">
                Choose sort type
              </Option>
              <Option value="newest">
                Newest
              </Option>
              <Option value="asc">
                Price (asc)
              </Option>
              <Option value="desc">
                Price (desc)
              </Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products
          category={category}
          filters={filters}
          sort={sort}
        />
      </Layout>
    </Container>
  );
};

export default ProductList;
