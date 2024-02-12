import React, { useState, useEffect } from "react";
import { MapBox } from "../components/publicDisplayEtablissementList/MapBox";
import { PublicCard } from "../components/publicDisplayEtablissementList/PublicCard";
import { useLocation } from "react-router-dom";

export const EtablissementsList = () => {
  const location = useLocation();
  const etablissements = location.state.etablissements;
  const [locations, setLocations] = useState([]);

  console.log(etablissements);
  useEffect(() => {
    setLocations(
      etablissements.map((etablissement) => ({
        id: etablissement.id,
        latitude: etablissement.latitude,
        longitude: etablissement.longitude,
        nom: etablissement.nom,
        adresse: etablissement.adresse,
      }))
    );
  }, [etablissements]);

  return (
    <div className="w-full grid" style={{ gridTemplateColumns: "1fr 1.5fr" }}>
      <div className="h-[93vh] overflow-y-auto">
        {etablissements.map((etablissement) => (
          <PublicCard key={etablissement.id} etablissement={etablissement} />
        ))}
      </div>
      <div className="h-[93vh]">
        <MapBox locations={locations} />
      </div>
    </div>
  );
};
