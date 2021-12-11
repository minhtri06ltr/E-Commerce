import {
  Facebook,
  Instagram,
  Phone,
  Pinterest,
  Room,
  Twitter,
  MailOutline,
} from "@mui/icons-material";
import { mobile, galaxy } from "../../responsive";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1`
  ${mobile({ textAlign: "center" })}
`;
const Description = styled.p`
  margin: 20px 0px;
  ${mobile({ textAlign: "center" })}
`;
const SocialContainer = styled.div`
  display: flex;
  ${mobile({ justifyContent: "center" })}
`;
const SocialIcon = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  ${mobile({ margin: "0 10px" })}
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
`;
const Title = styled.h1`
  margin-bottom: 30px;
  ${mobile({ textAlign: "center" })}
`;
const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  ${mobile({ textAlign: "center" })}
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({
    backgroundColor: "#fcf5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  })}
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  ${mobile({ textAlign: "center" })}
`;
const Payment = styled.img`
  width: 50%;
`;
const Footer = () => {
  return (
    <>
      <Container>
        <Left>
          <Logo>HOLO.</Logo>
          <Description>
            Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Numquam,
            repudiandae?
          </Description>
          <SocialContainer>
            <SocialIcon color="#385999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="#E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="#55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="#E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Find Something?</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Fashion</ListItem>
            <ListItem>Computer</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact us</Title>
          <ContactItem>
            <Room
              style={{ marginRight: "10px" }}
            />
            2/19, TP HCM,HM district
          </ContactItem>
          <ContactItem>
            <Phone
              style={{ marginRight: "10px" }}
            />
            +84 3679 0 7374
          </ContactItem>
          <ContactItem>
            <MailOutline
              style={{ marginRight: "10px" }}
            />
            laptopdienthoai1@gmail.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
      <div
        class="fb-page"
        data-href="https://www.facebook.com/HOLO-Support-100501352263768"
        data-tabs="timeline"
        data-width=""
        data-height=""
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/HOLO-Support-100501352263768"
          class="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/HOLO-Support-100501352263768">
            HOLO Support
          </a>
        </blockquote>
      </div>
    </>
  );
};

export default Footer;
