import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCartItems, removeCartItem } from "../apis/cart.api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const user_id = useSelector((state) => state.user.user?.id);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user_id) {
      fetchCartItems();
    }
  }, [user_id]);

  const fetchCartItems = async () => {
    try {
      const response = await getAllCartItems(user_id);
      if (response.success) {
        setCartItems(response.cartItems);
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  const incrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cart_item_id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cart_item_id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = async (id) => {
    try {
      await removeCartItem(id);
      setCartItems((prev) => prev.filter((item) => item.cart_item_id !== id));
    } catch (error) {
      console.log("Error in cart item remove", error);
    }
  };

  // Summary calculations
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price),
    0
  );

  return (
    <div className="home-container">
      {/* NAVBAR */}
      <Navbar />
      <main className="content-container">
        <div className="cart-container">
          {/* LEFT SIDE CART ITEMS */}
          <div className="cart-left">
            <h2>Your Cart</h2>

            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item-box" key={item.cart_item_id}>
                  <img
                    src={`/images/${item.image}`}
                    alt={item.product_name}
                    className="cart-item-img"
                  />

                  <div className="cart-item-details">
                    <h3>{item.product_name}</h3>
                    <p>{item.product_description}</p>

                    <div className="cart-qty">
                      <button onClick={() => decrementQty(item.cart_item_id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => incrementQty(item.cart_item_id)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price">${item.price}</div>

                  <div
                    className="cart-item-remove"
                    onClick={() => removeItem(item.cart_item_id)}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div className="cart-right">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      </main>
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Cart;
