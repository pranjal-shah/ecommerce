import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import socket from "../socket";
import { useNotification } from "../context/NotificationContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductDetails } from "../apis/product.api";
import { setCartItem } from "../apis/cart.api";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const user = useSelector((state) => state.user.user);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useNotification();
  const product = state.product;
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState({});
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const result = await getProductDetails(product.product_id);
        if (result.error) {
          navigate("/login");
          return;
        }

        if (result.product_details && result.product_details.length > 0) {
          const data = result.product_details[0].get_product_details;
          setProductDetails(data);
          if (data.variations && data.variations.length > 0) {
            setSelectedVariation(data.variations[0]);
            setSelectedAttributes(data.variations[0].attributes);
          }
        }
      } catch (error) {
        console.log("Error in fetching product details", error);
      }
    };

    fetchProductDetails();
  }, [product.product_id, navigate]);

  const handleAttributeChange = (attrName, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attrName]: value,
    }));

    const matchedVariation = productDetails.variations.find((v) => {
      return Object.entries(v.attributes).every(([key, val]) =>
        key === attrName ? val === value : true
      );
    });

    if (matchedVariation) {
      setSelectedVariation(matchedVariation);
    }
  };

  const handleAddToCart = async () => {
    try {
      console.log("user", user);
      const cartItemPayload = {
        quantity: quantity,
        variation_id: selectedVariation.variation_id,
        user_id: user.id,
      };
      console.log("cartItemPayload: ", cartItemPayload);
      socket.emit("add-cart", cartCount);
      await setCartItem(cartItemPayload);
    } catch (error) {
      console.log("Error Adding Product to Cart", error);
    }
  };

  return (
    <div className="home-container">
      {/* NAVBAR */}
      <Navbar />

      {/* PRODUCT DETAILS CONTENT */}
      {Object.keys(productDetails).length !== 0 ? (
        <main className="content-container">
          <div className="product-container">
            <div className="image-gallery">
              {selectedVariation?.images &&
              selectedVariation.images.length > 0 ? (
                selectedVariation.images.map((img, i) => (
                  <img
                    key={i}
                    src={`/images/${img}`}
                    alt={productDetails.product_name}
                    className="image-large"
                  />
                ))
              ) : (
                <img
                  src="/images/placeholder.jpg"
                  alt="No image"
                  className="image-large"
                />
              )}
            </div>

            {/* PRODUCT DETAILS */}
            <div className="product-details">
              <h1 className="product-title">{productDetails.product_name}</h1>
              <p className="product-subtitle">{productDetails.category_name}</p>
              <p className="price">₹ {selectedVariation?.price || "—"}</p>

              {/* Dynamic attribute selectors */}
              {selectedVariation &&
                Object.entries(selectedVariation.attributes).map(
                  ([attrName, attrValue]) => {
                    // Get all available options for this attribute
                    const options = [
                      ...new Set(
                        productDetails.variations.map(
                          (v) => v.attributes[attrName]
                        )
                      ),
                    ];

                    return (
                      <div className="product-attributes" key={attrName}>
                        <label htmlFor={attrName}>Select {attrName}:</label>
                        <select
                          id={attrName}
                          name={attrName}
                          value={selectedAttributes[attrName] || ""}
                          onChange={(e) =>
                            handleAttributeChange(attrName, e.target.value)
                          }
                        >
                          {options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                )}

              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={selectedVariation?.stock_quantity || 10}
                defaultValue={1}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <button
                className="add-cart-btn btn btn-primary"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>

              <div className="info-section">
                <details open>
                  <summary>Product Description</summary>
                  <p>{productDetails.product_description}</p>
                </details>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div>Loading...</div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ProductDetail;
