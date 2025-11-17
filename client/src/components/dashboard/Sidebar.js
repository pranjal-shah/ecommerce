import React from "react";

const Sidebar = ({ selected, setSelected }) => {
  return (
    <div className="sidebar">
      <div
        className={`sidebar-item ${selected === "add_product" ? "active" : ""}`}
        onClick={() => setSelected("add_product")}
      >
        Add Product
      </div>
      <div
        className={`sidebar-item ${selected === "products" ? "active" : ""}`}
        onClick={() => setSelected("products")}
      >
        Products
      </div>
      <div
        className={`sidebar-item ${selected === "users" ? "active" : ""}`}
        onClick={() => setSelected("users")}
      >
        Users
      </div>
    </div>
  );
};

export default Sidebar;
