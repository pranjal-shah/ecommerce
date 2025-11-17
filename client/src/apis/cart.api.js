import axios from "axios";

export const getAllCartItems = async (user_id) => {
  try {
    console.log(`in getAllCartItems--start`);

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/cart/${user_id}`,
      { withCredentials: true }
    );
    console.log(`in getAllCartItems--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in getAllCartItems--error`);
    return error.response.data;
  }
};

export const removeCartItem = async (cart_item_id) => {
  try {
    console.log(`in removeCartItem--start`);

    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER_URI}/cart/${cart_item_id}`,
      { withCredentials: true }
    );
    console.log(`in removeCartItem--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in removeCartItem--error`);
    return error.response.data;
  }
};

export const setCartItem = async (cartItemPayload) => {
  try {
    console.log(`in setCartItem--start`);

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/cart/cart-item`,
      { ...cartItemPayload },
      { withCredentials: true }
    );
    console.log(`in setCartItem--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in setCartItem--error`);
    return error.response.data;
  }
};
