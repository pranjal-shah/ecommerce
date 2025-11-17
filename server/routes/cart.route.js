import express from "express";
import {
  getAllCartItems,
  setCartItem,
  removeCartItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:user_id", getAllCartItems);
router.delete("/:cart_item_id", removeCartItem);
router.post("/cart-item", setCartItem);

export default router;
