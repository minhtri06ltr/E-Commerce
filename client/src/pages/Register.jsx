import styled from "styled-components";

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
  width: 40%;
  background-color: white;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px auto;
`;
const WrapButtonAndLink = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  font-weight: 700;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Link = styled.a`
  cursor: pointer;
  margin: 15px 0;
  font-size: 12px;
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE YOUR ACCOUNT</Title>
        <Form>
          <Input placeholder="First name" />
          <Input placeholder="Last name" />
          <Input placeholder="Email" />
          <Input placeholder="User name" />
          <Input placeholder="Password" />
          <Input placeholder="Confirm password" />
          <Agreement>
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Fugiat, numquam?
          </Agreement>
          <WrapButtonAndLink>
            <Button>REGISTER NOW</Button>
            <Link>ALREADY HAVE A ACCOUNT?</Link>
          </WrapButtonAndLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
