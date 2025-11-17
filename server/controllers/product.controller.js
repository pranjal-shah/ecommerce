import { connection } from "../config/db.config.js";

const getCategories = async (req, res, next) => {
  try {
    const parentId = Number(req.query.parentId);
    let result;
    if (parentId) {
      result = await connection.query(
        `select * from product_categories where parent_category_id = $1`,
        [parentId]
      );
    } else {
      result = await connection.query(
        "select * from product_categories where parent_category_id is null"
      );
    }
    const categories = result.rows;

    res.status(200).json({
      success: true,
      message: "Get all Parent categories",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const getAllAttributes = async (req, res, next) => {
  try {
    const result = await connection.query(`select * from product_attributes`);
    const attributes = result.rows;

    res.status(200).json({
      success: true,
      message: "Get all attributes",
      attributes,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const result = await connection.query(
      "SELECT * from public.get_active_products()"
    );
    const products = result.rows;

    res.status(200).json({
      success: true,
      message: "Get all products",
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductsByCategories = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;

    const result = await connection.query(
      "SELECT * FROM get_products_by_categories($1)",
      [categoryIds]
    );
    const products = result.rows;

    res.status(200).json({
      success: true,
      message: "Get products by category ids",
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const product_id = req.params.id;

    const result = await connection.query("SELECT get_product_details($1)", [
      product_id,
    ]);
    const product_details = result.rows;

    res.status(200).json({
      success: true,
      message: "Get all product details",
      product_details,
    });
  } catch (error) {
    next(error);
  }
};
const DeleteProduct = async (req, res, next) => {
  try {
    const product_id = req.params.id;

    const result = await connection.query("delete from products where id=$1", [
      product_id,
    ]);
    const response = result.rows;

    res.status(200).json({
      success: true,
      message: "Get all product details",
      response,
    });
  } catch (error) {
    next(error);
  }
};

const setProductDetails = async (req, res, next) => {
  try {
    const { product_data } = req.body;

    const result = await connection.query("call set_product_details($1)", [
      JSON.stringify(product_data),
    ]);
    const product_details = result.rows;

    res.status(200).json({
      success: true,
      message: "Set product details",
      product_details,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getCategories,
  getAllProducts,
  getProductDetails,
  setProductDetails,
  getProductsByCategories,
  DeleteProduct,
  getAllAttributes,
};
