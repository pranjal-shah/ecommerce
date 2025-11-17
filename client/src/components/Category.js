import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../apis/product.api.js";
import { fetchProductsByCategories } from "../features/product/product.thunks.js";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.product.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        if(result.error){
          navigate('/login')
          return;
        }
        if (result.categories && result.categories.length > 0) {
          dispatch({
            type: "product/setCategories",
            payload: result.categories,
          });
          dispatch(
            fetchProductsByCategories({
              categories: result.categories,
              last_category: null,
            })
          );
        }
      } catch (error) {
        console.log("Error in fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    try {
      setSelectedCategory(categoryId);

      if (categoryId) {
        const result = await getCategories(categoryId);
        if (result.categories && result.categories.length > 0) {
          console.log("cccc", result.categories);
          dispatch({
            type: "product/setCategories",
            payload: result.categories,
          });
          dispatch(
            fetchProductsByCategories({
              categories: result.categories,
              last_category: null,
            })
          );
        } else {
          dispatch({ type: "product/setCategories", payload: [] });
          dispatch(
            fetchProductsByCategories({
              categories: [],
              last_category: categories,
            })
          );
        }
      }
    } catch (error) {
      console.log("Error fetching subcategories", error);
    }
  };

  return (
    <section className="category-section">
      {categories ? (
        categories.map((cat) => (
          <div
            key={cat.id}
            className={`category ${
              selectedCategory === cat.id ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(cat.id)}
            style={{
              cursor: "pointer",
              fontWeight: selectedCategory === cat.id ? "bold" : "normal",
            }}
          >
            {cat.category_name}
          </div>
        ))
      ) : (
        <div>loading</div>
      )}
    </section>
  );
};

export default Category;
