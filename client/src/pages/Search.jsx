import Layout from "../components/layouts/Layout"
import {useEffect,useState} from 'react'
  import { fold,mobile } from "../responsive";
  import styled from 'styled-components'
import { SearchOutlined } from "@mui/icons-material";
import { publicRequest } from "../helper/requestMethods";
import ProductItem from "../components/items/ProductItem";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
justify-content:center;
  ${fold({ marginLeft: "0px" })}
`;
const Input = styled.input`
  border: none;
  padding-left: 10px;
  height:50px;
  width:80%;
  ${mobile({ width: "50px" })}
`;
const Search = () => {
    const [products, setProducts] = useState([]);
    const [filter,setFilter]=useState("")
    useEffect(() => {
        const getProducts = async () => {
          try {
            const response = await publicRequest.get(
              "/products"
            );
    
            setProducts(response.data.products);
          } catch (error) {
            console.log(error);
          }
        };
        getProducts();
      }, []);
     
    return (
        <Layout>
           <SearchContainer>
            <Input placeholder="Search" value={filter} onChange={e=>setFilter(e.target.value)} />
            <SearchOutlined
              style={{
                color: "gray",
                fontSize: "44px",
              }}
            />
          </SearchContainer>
         <Container>
         {
             filter ==="" ?  products
               
               .map((item, index) => (
                 <ProductItem
                   key={index}
                   item={item}
                  
                 />
               )) : products
               
               .filter((item, index) => 
                {
                    if(item.title.toLowerCase().includes(filter.toLowerCase())){
                        return item;
                    }
                }
               ).map((item,index)=> ( <ProductItem
                key={index}
                item={item}
               
              />))
          }
         </Container>
        </Layout>
    )
}

export default Search
