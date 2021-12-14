import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./items/ProductItem";
import { publicRequest } from "../helper/requestMethods";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({
  category,
  filters,
  sort,
}) => {
  console.log(filters);
  //state
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] =
    useState([]);
  //effect
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await publicRequest.get(
          category
            ? `/products?category=${category}`
            : "/products",
        );

        setProducts(
          response.data.products.sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt),
          ),
        );
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);
  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          //entries return array
          //every return boolean - every excute function for each item
          Object.entries(filters).every(
            ([key, value]) =>
              //key: color - value : red
              item[key].includes(value),
          ),
        ),
      );
  }, [products, category, filters]);
  console.log(sort);
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        //get all previous filtered product
        [...prev].sort(
          //compare two product -> return if first one is greater -> render first
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt),
        ),
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a, b) => a.price - b.price,
        ),
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a, b) => b.price - a.price,
        ),
      );
    }
  }, [sort]);
  //function
  console.log(filteredProducts);

  return (
    <Container>
      {category
        ? filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
              item={item}
            />
          ))
        : //limit products in home page
          products
            .slice(0, 8)
            .map((item, index) => (
              <ProductItem
                key={index}
                item={item}
              />
            ))}
    </Container>
  );
};

export default Products;
