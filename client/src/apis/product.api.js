import axios from "axios";

export const getCategories = async (parentId = null) => {
  try {
    console.log(`in getCategories--start`);
    const url = parentId
      ? `${process.env.REACT_APP_SERVER_URI}/product/categories?parentId=${parentId}`
      : `${process.env.REACT_APP_SERVER_URI}/product/categories`;

    const { data } = await axios.get(url, { withCredentials: true });
    console.log(`in getCategories--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in getCategories--error`);
    return error.response.data;
  }
};

export const getAllAttributes = async () => {
  try {
    console.log(`in getAllAttributes--start`);

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/product/attributes`,
      { withCredentials: true }
    );
    console.log(`in getAllAttributes--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in getAllAttributes--error`);
    return error.response.data;
  }
};

export const getAllProducts = async () => {
  try {
    console.log(`in getAllProducts--start`);

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/product`,
      { withCredentials: true }
    );
    console.log(`in getAllProducts--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in getAllProducts--error`);
    return error.response.data;
  }
};

export const getProductsByCategories = async (categoryIds = null) => {
  try {
    console.log(`in getProductsByCategories--start`);

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/product`,
      { categoryIds },
      { withCredentials: true }
    );
    console.log(`in getProductsByCategories--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in getProductsByCategories--error`);
    return error.response.data;
  }
};

export const getProductDetails = async (product_id) => {
  try {
    console.log(`in getProductDetails--start`);

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/product/${product_id}`,
      { withCredentials: true }
    );
    console.log(`in getProductDetails--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in getProductDetails--error`);
    return error.response.data;
  }
};

export const setProductDetails = async (productPayload) => {
  try {
    console.log(`in setProductDetails--start`);

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/product/product-details`,
      { ...productPayload },
      { withCredentials: true }
    );
    console.log(`in setProductDetails--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in setProductDetails--error`);
    return error.response.data;
  }
};

export const deleteProduct = async (product_id) => {
  try {
    console.log(`in deleteProduct--start`);

    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER_URI}/product/${product_id}`,
      { withCredentials: true }
    );
    console.log(`in deleteProduct--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in deleteProduct--error`);
    return error.response.data;
  }
};
