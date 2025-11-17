import { connection } from "../config/db.config.js";

const getAllCartItems = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const result = await connection.query(
      `select * from get_all_cart_items($1)`,
      [user_id]
    );

    const cartItems = result.rows;

    res.status(200).json({
      success: true,
      message: "Get all cartItems",
      cartItems,
    });
  } catch (error) {
    next(error);
  }
};
const removeCartItem = async (req, res, next) => {
  try {
    const cart_item_id = req.params.cart_item_id;
    const result = await connection.query(
      `delete from cart_items where id=$1`,
      [cart_item_id]
    );

    const cartItems = result.rows;

    res.status(200).json({
      success: true,
      message: "delete cart item",
      cartItems,
    });
  } catch (error) {
    next(error);
  }
};

const setCartItem = async (req, res, next) => {
  try {
    const { user_id, variation_id, quantity } = req.body;

    const itemInCart = await connection.query(
      "select * from cart_items where variation_id=$1",
      [variation_id]
    );
    let result;
    if (itemInCart.rows.length > 0) {
      const updated_quantity = itemInCart.rows[0].quantity + 1;
      result = await connection.query("update cart_items set quantity=$1", [
        updated_quantity,
      ]);
    } else {
      result = await connection.query("call set_cart_item($1, $2, $3)", [
        user_id,
        variation_id,
        quantity,
      ]);
    }

    const cart = result.rows;

    res.status(200).json({
      success: true,
      message: "Set product details",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllCartItems, setCartItem, removeCartItem };
