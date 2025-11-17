import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  const products = useSelector((state) => state.product.product.products);

  const handleProductClick = (product) => {
    navigate("/product-detail", { state: { product } });
  };

  useEffect(() => {
    setPage(1);
  }, [products]);

  if (!products) {
    return <div>Loading...</div>;
  }

  // PAGINATION LOGIC
  const totalPages = Math.ceil(products.length / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const visibleProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <section className="products">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <div
              key={product.id}
              className="product"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={`/images/${product.image}`}
                alt={product.product_name}
              />
              <h3>{product.product_name}</h3>
              <p className="category-name">
                {product.category_name || "Uncategorized"}
              </p>
              <p className="price">${product.price || "N/A"}</p>
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </section>

      {/* PAGINATION UI */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="page-btn"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={i}
              className={`page-number ${page === pageNum ? "active" : ""}`}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="page-btn"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Product;
