import styled from "styled-components";
import { mobile } from "../responsive";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.redd.it/5m2flzftc3e71.jpg")
      center;
  background-size: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;

  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  font-weight: 700;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: auto;
  margin-bottom: 10px;
`;
const Link = styled.a`
  cursor: pointer;
  margin: 5px auto;
  font-size: 12px;
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>LOGIN TO YOUR ACCOUNT</Title>
        <Form>
          <Input placeholder="Email" />
          <Input placeholder="User name" />
          <Button>LOGIN NOW</Button>
          <Link>FORGOT YOUR PASSWORD?</Link>
          <Link>FIRST TIME TO HOLO?</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
