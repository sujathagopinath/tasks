import React from "react";
import "./Home.css";
import bg from "../../assests/bg.png";
import { useTranslation } from "react-i18next";
const Home = () => {
  const { t, i18n } = useTranslation();
  i18n.changeLanguage();
  return (
    <div className="container">
      <div className="Content">
        <div className="SubContent">
          <h2>{t("signin.what's")}</h2>
          <img src={bg} alt="Products" />
        </div>
      </div>
    </div>
  );
};

export default Home;
