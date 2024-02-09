import { GalleryDisplay } from "../components/publicDisplayEtablissement/GalleryDisplay";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Feedback from "../components/Feedback";

export default function Prestation() {
  const [prestation, setPrestation] = useState(null);

  useEffect(() => {
    const fetchPrestation = async () => {
      try {
        const url = window.location.href.split("/");
        const prestationsId = url[url.length - 1];
        const response = await axios.get(
          `https://127.0.0.1:8000/api/prestations/${prestationsId}`
        );
        setPrestation(response.data);
      } catch (error) {
        console.error("Error fetching prestation information:", error);
      }
    };

    fetchPrestation();
  }, []);

  return (
    <div className="my-10 w-[60%]">
      {prestation && (
        <div>
          <div className="flex justify-between items-end">
            <div className="items-start">
              <h1 className="text-2xl text-black font-semibold">
                {prestation.titre}
              </h1>
              <span className="text text-black">{prestation.description}</span>
              <div className="flex items-center">
                <span className="text-gray-500 font-light">
                  {prestation.duree * 30}mins
                </span>
                <span className="text-gray-300 mr-1 ml-1"> • </span>
                <span className="text-gray-500">{prestation.prix} €</span>
              </div>
            </div>
            <Link to="/">
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Prendre RDV
              </button>
            </Link>
          </div>
          <GalleryDisplay className="w-full" />
          <Feedback />
        </div>
      )}
    </div>
  );
}
