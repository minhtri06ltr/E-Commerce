import styled from "styled-components";
import { mobile,galaxy } from "../responsive";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { register } from "../redux/apiRequest";
import validator from "validator";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
  ${mobile({ width: "75%" })}
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
  text-align: center;
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
const Redirect = styled.span`
  cursor: pointer;
  margin: 15px 0;
  font-size: 12px;
`;
const Error = styled.span`
  color: red;
  text-align: center;
`;
const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] =
    useState("Something went wrong");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const userRegister = (e) => {
    //prevent refesh page
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setErrorMessage("Invalid email");
      return;
    } else if (password.length < 6) {
      setErrorMessage(
        "Password at least 6 characters long",
      );
      return;
    } else if (confirmPassword !== password) {
      setErrorMessage(
        "Password and confirm password incorrect",
      );
      return;
    } else {
      register(dispatch, {
        email,
        username,
        password,
      });
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE YOUR ACCOUNT</Title>
        <Form>
          <Input
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
          <Input
            placeholder="User name"
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
          <Input
            placeholder="Confirm password"
            type="password"
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />
          <Agreement>
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Fugiat, numquam?
          </Agreement>
          <WrapButtonAndLink>
            <Button onClick={userRegister}>
              REGISTER NOW
            </Button>
            {user.error && (
              <Error>{errorMessage}</Error>
            )}
            <Link to="/login">
              <Redirect>
                ALREADY HAVE A ACCOUNT?
              </Redirect>
            </Link>
          </WrapButtonAndLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
