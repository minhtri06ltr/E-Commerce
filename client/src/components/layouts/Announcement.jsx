import styled from "styled-components";
import { galaxy } from "../../responsive";
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  ${galaxy({width: "110%"})}
 
`;

const Announcement = () => {
  return (
    <Container>
      Join our super deal! with Black Friday
    </Container>
  );
};

export default Announcement;
