import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../apis/auth.api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogoClick = () => {
    if (location.pathname === "/") navigate(0);
    else navigate("/");
  };

  const handleUserClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      setMenuOpen(false);
      await logout();
      dispatch({ type: "user/setLogout" });
      dispatch({ type: "product/emptyProduct" });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="home" onClick={handleLogoClick}>
          Home
        </h2>
      </div>

      <div className="nav-center">
        <h1 className="logo" onClick={handleLogoClick}>
          ShopEase
        </h1>
      </div>

      <div className="nav-right" ref={dropdownRef}>
        <div className="user-cart" onClick={()=>navigate('/user-cart')}>
          <i class="fa-solid fa-cart-arrow-down"></i>
        </div>
        <div className="user-profile" onClick={handleUserClick}>
          <i className="fa-regular fa-user"></i>
        </div>

        {menuOpen && (
          <div className="user-menu">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </>
            ) : (
              <>
                {user.role === "SELLER" && (
                  <Link
                    to="/seller-dashboard"
                    onClick={() => setMenuOpen(false)}
                  >
                    Supplier Dashboard
                  </Link>
                )}
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
