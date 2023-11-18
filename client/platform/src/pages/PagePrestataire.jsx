import React from "react";
import { GalleryDisplay } from "../components/GalleryDisplay";
import { getPrestataire } from "../services/prestataires.service";
import { LuMapPin } from "react-icons/lu";
import { Link } from "react-router-dom";
import { PrestationWrapper } from "../components/PrestationsWrapper";

export const PagePrestataire = () => {
  const [prestataire, setPrestataire] = React.useState(null);

  React.useEffect(() => {
    const fetchPrestataire = async () => {
      const presta = await getPrestataire();
      setPrestataire(presta);
    };
    fetchPrestataire();
  }, []);

  const handleOnClick = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      prestataire?.adresse
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="my-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl text-black font-semibold">
            {prestataire?.nom}
          </h1>
          <span
            className="text-lg text-gray-500 font-light underline cursor-pointer"
            onClick={handleOnClick}
          >
            <LuMapPin className="inline-block mr-1 mb-1" />
            {prestataire?.adresse}
          </span>
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
      <div className="flex items-start mb-10">
        <h1 className="text-2xl font-semibold text-black">
          Reservez en ligne pour un RDV chez {prestataire?.nom}
        </h1>
      </div>
      <div className="flex flex-col items-start my-3">
        <h1 className="text-2xl font-semibold text-black">
          Choix de la prestation
        </h1>
        <PrestationWrapper prestations={prestataire?.prestations} />
      </div>
    </div>
  );
};
