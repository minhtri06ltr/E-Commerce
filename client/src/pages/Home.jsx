import Layout from "../components/layouts/Layout";
import Products from "../components/Products";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
const Home = () => {
  return (
    <Layout>
      <Slider />
      <Categories />
      <Products />
    </Layout>
  );
};

export default Home;
