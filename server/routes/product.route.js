import express from "express";
import {
  getCategories,
  getAllAttributes,
  getAllProducts,
  getProductDetails,
  setProductDetails,
  getProductsByCategories,
  DeleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/attributes", getAllAttributes);
router.get("/:id", getProductDetails);
router.delete("/:id", DeleteProduct);
router.get("/", getAllProducts);
router.post("/", getProductsByCategories);
router.post("/product-details", setProductDetails);

export default router;
