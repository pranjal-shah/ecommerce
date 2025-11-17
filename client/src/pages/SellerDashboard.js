import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/dashboard/Sidebar";
import AddProduct from "../components/dashboard/AddProduct";
import Products from "../components/dashboard/Products";
import Users from "../components/dashboard/Users";

const SellerDashboard = () => {
  const [selected, setSelected] = useState("add_product");

  const renderContent = () => {
    switch (selected) {
      case "add_product":
        return <AddProduct setSelected={setSelected} />;
      case "products":
        return <Products />;
      case "users":
        return <Users />;
      default:
        return <AddProduct setSelected={setSelected} />;
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <main className="content-container">
        <div className="dashboard-container">
          <Sidebar selected={selected} setSelected={setSelected} />
          <div className="dashboard-content">{renderContent()}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboard;
