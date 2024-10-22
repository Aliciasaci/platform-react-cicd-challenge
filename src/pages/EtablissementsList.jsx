import React, { useState, useEffect } from "react";
import { MapBox } from "../components/publicDisplayEtablissementList/MapBox";
import { PublicCard } from "../components/publicDisplayEtablissementList/PublicCard";
import { useLocation } from "react-router-dom";
import useCachedData from "../hooks/useCachedData";
import {
  getEtablissements,
  returnNull,
} from "../services/prestataires.service";
import { ErrorComponent } from "../components/ErrorComponent";

export const EtablissementsList = () => {
  const location = useLocation();
  const [etablissements, setEtablissements] = useState(
    location.state?.etablissements || null
  );

  // Log location.state to verify the data passed in
  useEffect(() => {
    console.log("Location state:", location.state);
  }, [location.state]);

  const {
    data: etablissementsDefault,
    isLoading,
    error,
  } = useCachedData(etablissements ? returnNull : getEtablissements);

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Log when etablissementsDefault updates
    console.log("Etablissements default data:", etablissementsDefault);

    if (!etablissements && etablissementsDefault) {
      setEtablissements(etablissementsDefault["hydra:member"]);
    }
  }, [etablissementsDefault, etablissements]);

  useEffect(() => {
    if (etablissements) {
      setLocations(
        etablissements.map((etablissement) => ({
          id: etablissement.id,
          latitude: etablissement.latitude,
          longitude: etablissement.longitude,
          nom: etablissement.nom,
          adresse: etablissement.adresse,
        }))
      );

      // Log locations to verify mapping
      console.log("Locations set:", locations);
    }
  }, [etablissements]);

  if (error) {
    return (
      <div className="h-screen w-full errorbg">
        <ErrorComponent status={error.status} />
      </div>
    );
  }

  return (
    <div className="w-full grid" style={{ gridTemplateColumns: "1fr 1.5fr" }}>
      <div className="h-[93vh] overflow-y-auto">
        {etablissements?.map((etablissement) => (
          <PublicCard
            key={etablissement.id}
            etablissement={etablissement}
            isLoading={isLoading}
          />
        ))}
      </div>
      <div className="h-[93vh]">
        <MapBox locations={locations} isLoading={isLoading} />
      </div>
    </div>
  );
};
