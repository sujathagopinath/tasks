import React from "react";
import "./Header.css";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Actions/Users/useraction";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { t, i18n } = useTranslation();
  function handleclick(lang) {
    i18n.changeLanguage(lang);
  }
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useNavigate();

  const isAuth = sessionStorage.getItem("role");
  const userName = JSON.stringify(sessionStorage.getItem("userName"));

  const logoutHandler = () => {
    dispatch(logoutUser());
    history("/");
  };

  return (
    <header>
      <nav>
        <h3>{t("product.name")}</h3>
        <ul className="underline">
          {userInfo ? (
            <>
              <li className="items">
                <button onClick={logoutHandler} className="logout">
                  <LogoutIcon />
                </button>
              </li>
              <li className="items">
                <Tooltip
                  title={userName}
                  style={{ cursor: "pointer" }}
                  variant="contained"
                >
                  <PersonIcon />
                </Tooltip>
              </li>
            </>
          ) : (
            <>
              <li className="items">
                <a href="signup" className="links">
                  {t("product.register")}
                </a>
              </li>
              <li className="items">
                <a href="signin" className="links">
                  {t("product.login")}
                </a>
              </li>
            </>
          )}

          {isAuth === "ADMIN" ? (
            <>
              <li className="items">
                <a className="links" href="create">
                  {t("header.addproducts")}
                </a>
              </li>

              <li className="items">
                <a className="links" href="products">
                  {t("header.products")}
                </a>
              </li>

              <li className="items">
                <a className="links" href="allusers">
                  {t("header.users")}
                </a>
              </li>

              <li className="items">
                <a className="links" href="allorders">
                  <Tooltip
                    title="Orders"
                    style={{ cursor: "pointer" }}
                    variant="contained"
                  >
                    <LocalShippingIcon />
                  </Tooltip>
                </a>
              </li>

              <li className="items">
                <a className="links" href="update">
                  {t("header.profile")}
                </a>
              </li>

              <li className="items">
                <button className="press" onClick={() => handleclick("ta")}>
                  Ta
                </button>
                <button className="press" onClick={() => handleclick("en")}>
                  En
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="items">
                <a className="links" href="allproducts">
                  {t("header.items")}
                </a>
              </li>

              <li className="items">
                <a className="links" href="update">
                  {t("header.profile")}
                </a>
              </li>
              <li className="items">
                <a className="links" href="cart">
                  <Tooltip
                    title="Cart"
                    style={{ cursor: "pointer" }}
                    variant="contained"
                  >
                    <AddShoppingCartIcon />
                  </Tooltip>
                </a>
              </li>
              <li className="items">
                <button className="press" onClick={() => handleclick("ta")}>
                  Ta
                </button>
                <button className="press" onClick={() => handleclick("en")}>
                  En
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
