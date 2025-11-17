import React, { useEffect, useState } from "react";
import {
  getCategories,
  getAllAttributes,
  setProductDetails,
} from "../../apis/product.api";

const AddProduct = ({ setSelected }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    category_name: "",
    variations: [],
  });

  const [variation, setVariation] = useState({
    price: "",
    stock_quantity: "",
    attributes: [{ attribute_id: "", value: "" }],
    images: [],
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const cats = await getCategories();
    setCategories(cats.categories || []);

    const attrs = await getAllAttributes();
    setAttributes(attrs.attributes || []);
  };

  const handleCategoryChange = async (e) => {
    const id = e.target.value;

    const sub = await getCategories(id);
    setSubcategories(sub.categories || []);
  };

  const handleSubcategoryChange = (e) => {
    const id = e.target.value;
    const found = subcategories.find((s) => s.id == id);

    setProduct({
      ...product,
      category_name: found?.category_name || "",
    });
  };

  // ========== VARIATION FIELDS ==========
  const handleVarChange = (e) => {
    const { name, value } = e.target;
    setVariation({ ...variation, [name]: value });
  };

  // -- Attribute handling --
  const handleAttributeChange = (i, field, value) => {
    const updated = [...variation.attributes];
    updated[i][field] = value;
    setVariation({ ...variation, attributes: updated });
  };

  const addAttributeField = () => {
    setVariation({
      ...variation,
      attributes: [...variation.attributes, { attribute_id: "", value: "" }],
    });
  };

  // -- Image upload --
  const handleImageUpload = (e) => {
    const files = [...e.target.files];

    if (variation.images.length + files.length > 2) {
      alert("Max 2 images allowed.");
      return;
    }

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setVariation({
      ...variation,
      images: [...variation.images, ...previews],
    });
  };

  const removeImage = (i) => {
    const imgs = [...variation.images];
    imgs.splice(i, 1);
    setVariation({ ...variation, images: imgs });
  };

  // ========== ADD VARIATION ==========
  const addVariation = () => {
    if (!variation.price || !variation.stock_quantity) {
      alert("Price and Stock required!");
      return;
    }

    // Build attribute object { Size: "L", Color: "Red" }
    const attrsObj = {};
    variation.attributes.forEach((a) => {
      const att = attributes.find((x) => x.id == a.attribute_id);
      if (att) attrsObj[att.attribute_name] = a.value;
    });

    const finalVariation = {
      price: parseFloat(variation.price),
      stock_quantity: parseInt(variation.stock_quantity),
      attributes: attrsObj,
      images: variation.images.map((img) => img.file.name),
    };

    setProduct({
      ...product,
      variations: [...product.variations, finalVariation],
    });

    // Reset variation block
    setVariation({
      price: "",
      stock_quantity: "",
      attributes: [{ attribute_id: "", value: "" }],
      images: [],
    });
  };

  // ========= FINAL DATA SUBMISSION ==========

  const handleSubmit = async () => {
    try {
      if (product.product_name === "") {
        return;
      }
      const finalData = {
        product_data: product,
      };

      await setProductDetails(finalData);
      setSelected("products");
    } catch (error) {
      console.log("Error Saving product", error);
    }
  };

  return (
    <div className="add-container">
      <h2>Add Product</h2>

      {/* PRODUCT FIELDS */}
      <input
        placeholder="Product Name"
        name="product_name"
        value={product.product_name}
        onChange={(e) =>
          setProduct({ ...product, product_name: e.target.value })
        }
      />

      <textarea
        placeholder="Product Description"
        value={product.product_description}
        onChange={(e) =>
          setProduct({ ...product, product_description: e.target.value })
        }
      />

      {/* Category */}
      <select onChange={handleCategoryChange}>
        <option value="">-- Select Category --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.category_name}
          </option>
        ))}
      </select>

      {/* Subcategory */}
      <select
        disabled={!subcategories.length}
        onChange={handleSubcategoryChange}
      >
        <option value="">-- Select Subcategory --</option>
        {subcategories.map((s) => (
          <option key={s.id} value={s.id}>
            {s.category_name}
          </option>
        ))}
      </select>

      <hr />

      {/* VARIATION BLOCK */}
      <div className="variation-block">
        <div className="side-by-side">
          <input
            name="price"
            type="number"
            placeholder="Price"
            min={0}
            value={variation.price}
            onChange={handleVarChange}
          />

          <input
            name="stock_quantity"
            type="number"
            placeholder="Stock"
            min={10}
            value={variation.stock_quantity}
            onChange={handleVarChange}
          />
        </div>

        {/* ATTRIBUTE FIELDS */}
        <div className="attr-section">
          {variation.attributes.map((a, i) => (
            <div key={i} className="side-by-side">
              <select
                value={a.attribute_id}
                onChange={(e) =>
                  handleAttributeChange(i, "attribute_id", e.target.value)
                }
              >
                <option value="">-- Attribute --</option>
                {attributes.map((att) => (
                  <option key={att.id} value={att.id}>
                    {att.attribute_name}
                  </option>
                ))}
              </select>

              <input
                placeholder="Value"
                value={a.value}
                onChange={(e) =>
                  handleAttributeChange(i, "value", e.target.value)
                }
              />
            </div>
          ))}

          <button className="add-btn" onClick={addAttributeField}>
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="image-section">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />

          <div className="preview-box">
            {variation.images.map((img, index) => (
              <div key={index} className="img-wrapper">
                <span className="delete-img" onClick={() => removeImage(index)}>
                  <i class="fa-solid fa-xmark"></i>
                </span>
                <img src={img.url} alt="preview" />
              </div>
            ))}
          </div>
        </div>

        {/* ADD VARIATION */}
        <button className="add-var-btn" onClick={addVariation}>
          Add Variation
        </button>
      </div>

      {/* SAVE PRODUCT */}
      <button className="submit-btn" onClick={handleSubmit}>
        Save Product
      </button>
    </div>
  );
};

export default AddProduct;
