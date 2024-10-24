import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context";
import { useTranslation } from "react-i18next";
import UserInformations from "../components/userprofil/UserInformations";
import UserReservations from "../components/userprofil/UserReservations";
import CancelledReservations from "../components/userprofil/CancelledReservations";
import PastReservations from "../components/userprofil/PastReservations";

export default function ProfilUser() {
  const [selectedTab, setSelectedTab] = useState("reservations");
  const navigate = useNavigate();
  const { userId, setUserId, userToken, setUserToken, userEmail } = useContext(AppContext);
  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState({
    nom: "",
    prenom: "",
    email: "",
  });
  const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false); // Ajout d'un état pour suivre si les infos sont chargées

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const logout = () => {
    setUserToken("");
    navigate("/platform-react-cicd-challenge/login");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      // Ne fais l'appel API que si les informations ne sont pas déjà chargées
      if (!userEmail || isUserInfoLoaded) {
        console.log("L'appel API n'est pas nécessaire, les infos sont déjà chargées ou l'email utilisateur est manquant.");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/users?email=${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const hydraMember = response.data["hydra:member"];

        if (hydraMember.length > 0) {
          const user = hydraMember[0];
          setUserInfo(user);
          setUserId(user.id);
          setIsUserInfoLoaded(true); // Marquer comme chargé pour éviter les futurs appels API inutiles
        } else {
          console.log("Aucun utilisateur trouvé");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur :", error);
      }
    };

    fetchUserInfo();
  }, [userEmail, userToken, setUserId, isUserInfoLoaded]); // On ajoute isUserInfoLoaded dans les dépendances pour qu'il ne se réexécute pas inutilement

  return (
    <div className="w-3/4 mb-8 h-90">
      <div className="bg-gray-100 flex w-full justify-between">
        <div className="mt-10 mr-2 w-1/4 block p-6 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="text-xl text-gray-800">{t("Common_My_Account")}</h5>
          <ul className="list-none mt-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => handleTabClick("mon-compte")}
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {t("User_Profil_Information")}
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => handleTabClick("reservations")}
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {t("Reservation_Futur")}
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => handleTabClick("cancelled-reservations")}
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {t("Reservation_Cancelled")}
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => handleTabClick("past-reservations")}
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {t("Reservation_Past")}
                </span>
              </a>
            </li>
          </ul>
          <hr className="mt-6 mb-6" />

          <button
            onClick={logout}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {t("Common_Logout")}
          </button>
        </div>
        {selectedTab === "mon-compte" && (
          <UserInformations userInfo={userInfo}></UserInformations>
        )}
        {selectedTab === "cancelled-reservations" && (
          <CancelledReservations></CancelledReservations>
        )}
        {selectedTab === "reservations" && (
          <UserReservations></UserReservations>
        )}
        {selectedTab === "past-reservations" && (
          <PastReservations></PastReservations>
        )}
      </div>
    </div>
  );
}
