import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../apis/product.api";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const result = await getAllProducts();
      setProductsData(result.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleDeleteProduct = async (product_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(product_id);

      setProductsData((prev) => prev.filter((p) => p.product_id !== product_id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (productsData.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="products-section">
      <h2>Product Management</h2>
      {productsData.map((product) => (
        <div className="product-item" key={product.product_id}>
          <div className="product-name">
            <img src={`images/${product.image}`} alt={product.product_name} />
            {product.product_name}
          </div>
          <div className="product-price">${product.price}</div>
          <button
            className="delete-btn"
            onClick={() => handleDeleteProduct(product.product_id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
