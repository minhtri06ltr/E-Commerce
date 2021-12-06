import styled from "styled-components";
import {
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { mobile, fold } from "../../responsive";
import { Link } from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { logout } from "../../redux/apiRequest";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
  ${fold({ height: "70px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ padding: "8px 0" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 2 })}
  ${fold({ flexDirection: "column" })}
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  ${fold({ marginLeft: "10px" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({
    fontSize: "12px",
    marginLeft: "10px",
  })}
`;

//render component
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const userLogout = () => {
    console.log("2");
    logout(dispatch);
  };
  const login = () => {
    return (
      <>
        <MenuItem>
          WELCOME{" "}
          {user.currentUser.username.toUpperCase()}
        </MenuItem>
        <MenuItem onClick={userLogout}>
          LOGOUT
        </MenuItem>
      </>
    );
  };
  const nonLogin = () => {
    return (
      <>
        <Link to="/register">
          <MenuItem>REGISTER</MenuItem>
        </Link>
        <Link to="/login">
          <MenuItem>LOGIN</MenuItem>
        </Link>
      </>
    );
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
        <Link to='/search'>  <MenuItem>ALL PRODUCTS</MenuItem></Link>
        <Link to='/orders'>  <MenuItem>YOUR ORDER</MenuItem></Link>
        </Left>
        <Center>
          <Link to="/">
            <Logo>HOLO.</Logo>
          </Link>
        </Center>
        <Right>
          {user.currentUser
            ? login()
            : nonLogin()}
          <MenuItem>
            <Link to="/cart">
              <Badge
                badgeContent={cart.quantity}
                color="primary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
