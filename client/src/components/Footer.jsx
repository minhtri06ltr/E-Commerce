import {
  Facebook,
  Instagram,
  Phone,
  Pinterest,
  Room,
  Twitter,
  MailOutline,
} from "@mui/icons-material";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Description = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
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
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
`;
const Title = styled.h1`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 50%;
`;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>HOLO.</Logo>
        <Description>
          Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Numquam, repudiandae?
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
          <Room style={{ marginRight: "10px" }} />
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
        <Payment src="https://i.redd.it/5m2flzftc3e71.jpg" />
      </Right>
    </Container>
  );
};

export default Footer;
