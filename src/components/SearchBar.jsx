import React, { useState } from "react";
import { res } from "react-email-validator";
import { useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchInput1, setSearchInput1] = useState(""); // Que recherchez-vous ?
  const [searchInput2, setSearchInput2] = useState(""); // Ou ?
  const [searchInput3, setSearchInput3] = useState(""); // Autour de combien de km ?
  const [etablissements, setEtablissements] = useState([]);
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("userToken");

  const [fil1, setFil1] = useState(false);
  const [fil2, setFil2] = useState(false);
  const [fil3, setFil3] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setNoResults(false);

      if (searchInput3 !== "") {
        const getLocationAsync = () => {
          return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const latitude = position.coords.latitude;
                  const longitude = position.coords.longitude;
                  setLocation({ latitude, longitude });
                  resolve({ latitude, longitude });
                },
                (error) => {
                  console.error(error);
                  reject(error);
                }
              );
            } else {
              console.error("Geolocation is not supported by this browser.");
              reject("Geolocation is not supported by this browser.");
            }
          });
        };

        const locationData = await getLocationAsync();

        if (locationData) {
          let distance = `${locationData.latitude},${locationData.longitude},${searchInput3}`;
          if (searchInput1 !== "" && searchInput2 !== "") {
            if (searchInput2.match(/^\d+$/)) {
              await fetchFilterResults(searchInput1, null, searchInput2, distance);
            } else {
              await fetchFilterResults(searchInput1, searchInput2, null, distance);
            }
          } else if (searchInput1 === "" && searchInput2 !== "") {
            if (searchInput2.match(/^\d+$/)) {
              await fetchFilterResults(null, null, searchInput2, distance);
            } else {
              await fetchFilterResults(null, searchInput2, null, distance);
            }
          } else if (searchInput1 !== "" && searchInput2 === "") {
            await fetchFilterResults(searchInput1, null, null, distance);
          } else {
            await fetchFilterResults(null, null, null, distance);
          }
        }
      } else {
        // If distance is not set
        if (searchInput1 !== "" && searchInput2 !== "") {
          if (searchInput2.match(/^\d+$/)) {
            await fetchFilterResults(searchInput1, null, searchInput2, null);
          } else {
            await fetchFilterResults(searchInput1, searchInput2, null, null);
          }
        } else if (searchInput1 === "" && searchInput2 !== "") {
          if (searchInput2.match(/^\d+$/)) {
            await fetchFilterResults(null, null, searchInput2, null);
          } else {
            await fetchFilterResults(null, searchInput2, null, null);
          }
        } else if (searchInput1 !== "" && searchInput2 === "") {
          await fetchFilterResults(searchInput1, null, null, null);
        } else {
          return;
        }
      }

      if (!fil1 && !fil2 && !fil3) {
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error handling search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
  };

  const error = (error) => {
    console.error(error);
  };

  const fetchFilterResults = async (
    searchInput,
    ville,
    codePostal,
    distance
  ) => {
    try {
      let url = `${import.meta.env.VITE_SERVER_URL}/filter`;
      if (searchInput) {
        url += `?prestation.titre=${encodeURIComponent(searchInput)}`;
      }
      if (ville) {
        url += `${searchInput ? "&" : "?"}ville=${encodeURIComponent(ville)}`;
      }
      if (codePostal) {
        url += `${searchInput || ville ? "&" : "?"}codePostal=${encodeURIComponent(codePostal)}`;
      }
      if (distance) {
        url += `${searchInput || ville || codePostal ? "&" : "?"}distance=${encodeURIComponent(distance)}`;
      }

      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${storedToken}`
        },
      });

      console.log(response.data.length);
      console.log(response.data);

      if (response.data.length > 0) {
        setFil1(true);
        setEtablissements(response.data);
        navigate("/platform-react-cicd-challenge/etablissements", {
          state: {
            etablissements: response.data,
          },
        });
        return; // Exit after successful navigation
      } else {
        setFil1(false);
      }

      // Attempt second filter with 'nom'
      let secondUrl = `${import.meta.env.VITE_SERVER_URL}/filter`;
      if (searchInput) {
        secondUrl += `?nom=${encodeURIComponent(searchInput)}`;
      }
      if (ville) {
        secondUrl += `${searchInput ? "&" : "?"}ville=${encodeURIComponent(ville)}`;
      }
      if (codePostal) {
        secondUrl += `${searchInput || ville ? "&" : "?"}codePostal=${encodeURIComponent(codePostal)}`;
      }
      if (distance) {
        secondUrl += `${searchInput || ville || codePostal ? "&" : "?"}distance=${encodeURIComponent(distance)}`;
      }

      const secondResponse = await axios.get(secondUrl, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${storedToken}`
        },
      });

      console.log(secondResponse.data.length);
      console.log(secondResponse.data);
      if (secondResponse.data.length > 0) {
        setFil2(true);
        setEtablissements(secondResponse.data);
        navigate("/platform-react-cicd-challenge/etablissements", {
          state: {
            etablissements: secondResponse.data,
          },
        });
        return; // Exit after successful navigation
      } else {
        setFil2(false);
      }

      // // Attempt third filter with 'prestation.category'
      // let thirdUrl = `${import.meta.env.VITE_SERVER_URL}/filter`;
      // if (searchInput) {
      //   thirdUrl += `?prestation.category=${encodeURIComponent(searchInput)}`;
      // }
      // if (ville) {
      //   thirdUrl += `${searchInput ? "&" : "?"}ville=${encodeURIComponent(ville)}`;
      // }
      // if (codePostal) {
      //   thirdUrl += `${searchInput || ville ? "&" : "?"}codePostal=${encodeURIComponent(codePostal)}`;
      // }
      // if (distance) {
      //   thirdUrl += `${searchInput || ville || codePostal ? "&" : "?"}distance=${encodeURIComponent(distance)}`;
      // }

      // console.log(thirdUrl);
      // const thirdResponse = await axios.get(thirdUrl, {
      //   headers: {
      //     Accept: "application/json",
      //     Authorization: `Bearer ${storedToken}`
      //   },
      // });

      // console.log(thirdResponse.data.length);
      // console.log(thirdResponse.data);
      // if (thirdResponse.data.length > 0) {
      //   setFil3(true);
      //   setEtablissements(thirdResponse.data);
      //   navigate("/platform-react-cicd-challenge/etablissements", {
      //     state: {
      //       etablissements: thirdResponse.data,
      //     },
      //   });
      //   return; // Exit after successful navigation
      // } else {
      //   setFil3(false);
      // }

      // If all filters fail, do not navigate
    } catch (error) {
      console.error("Error fetching information:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="searchbar">
        <div className="flex justify-between">
          <div className="basis-1/2">
            <label
              htmlFor="default-search1"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search1"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-white rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("Search_LookingFor")}
                onChange={(e) => setSearchInput1(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="basis-2/5">
            <label
              htmlFor="default-search2"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search2"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-white rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("Search_Where")}
                onChange={(e) => setSearchInput2(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="basis-3/5">
            {/* <label
              htmlFor="default-search3"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label> */}
            {/* <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search3"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-white rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("Search_Km")}
                onChange={(e) => setSearchInput3(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 end-0 text-sm flex items-center pe-3 pointer-events-none text-gray-500 dark:text-gray-400">
                {t("Search_Autour")}
              </div>
            </div> */}
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Rechercher
          </button>
        </div>
        {isLoading && (
          <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
            {t("Loading")}...
          </div>
        )}
        {noResults && (
          <div className="mt-4 text-center text-red-500 dark:text-red-400">
            {t("No_Etablissements_Found")}
          </div>
        )}
      </div>
    </div>
  );
}
