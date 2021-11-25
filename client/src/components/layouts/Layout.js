import Navbar from "./Navbar";
import Announcement from "./Announcement";
import Letter from "./Letter";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Announcement />
      {children}
      <Letter />
      <Footer />
    </>
  );
};

export default Layout;
