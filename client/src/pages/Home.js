import Category from "../components/Category";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Product from "../components/Product";

const Home = () => {
  return (
    <div className="home-container">
      {/* NAVBAR */}
      <Navbar></Navbar>

      {/* <!-- MAIN CONTENT --> */}
      <main className="content-container">
        {/* CATEGORY */}
        <Category></Category>

        {/* PRODUCT */}
        <Product></Product>
      </main>

      {/* FOOTER  */}
      <Footer></Footer>
    </div>
  );
};

export default Home;
