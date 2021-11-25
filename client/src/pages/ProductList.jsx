import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";

const Container = styled.div``;
const Title = styled.h1`
margin: 20px;
`;
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
`;
const Filter = styled.div``;
const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>CPU</Title>
      <FilterContainer>
      <Filter>

</Filter>
<Filter>

      </Filter>
      <Filter>

      </Filter>
      </FilterContainer>
    </Container>
  );
};

export default ProductList;
