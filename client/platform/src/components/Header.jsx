import React, { useContext, useEffect } from "react";
import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { AppContext } from "../context";
import { useState } from "react";
import { LanguageChanger } from "./LanguageChanger";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { userToken, setUserToken } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setUserToken(storedToken);
    }
  }, []);

  const loginButton = userToken ? (
    <Link to="/user-profile">
      <Button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-s me-2 mb-2 text-white dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Profile
      </Button>
    </Link>
  ) : (
    <Link to="/login">
      <Button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-s me-2 mb-2 text-white dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Se connecter
      </Button>
    </Link>
  );

  return (
    <Navbar fluid>
      <Navbar.Brand>
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white logo">PICKME</span> */}
        <Link
          to="/"
          className="self-center whitespace-nowrap text-xl font-semibold dark:text-white logo"
        >
          PICKME
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2 items-start">
        <Link to="/reservation">
          <Button
            type="button"
            className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {t("Common_Reservation")}
          </Button>
        </Link>
        <Link to="/">
          <Button
            type="button"
            className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {t("Common_Home")}
          </Button>
        </Link>
        <Link to="/prestataire-register">
          <Button
            type="button"
            className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {t("Header_Provider_Phrase")}
          </Button>
        </Link>
        <Navbar.Toggle />
             {loginButton}
        <LanguageChanger />
      </div>
    </Navbar>
  );
};

export default Header;
