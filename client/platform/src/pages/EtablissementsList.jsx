import React from "react";
import { MapBox } from "../components/publicDisplayEtablissementList/MapBox";
import { PublicCard } from "../components/publicDisplayEtablissementList/PublicCard";
import useCachedData from "../hooks/useCachedData";
import { getEtablissementList } from "../services/prestataires.service";

export const EtablissementsList = ({ filter }) => {
  //const { data: etablissements } = useCachedData(getEtablissements, filter);
  const [etablissements, setEtablissements] = React.useState([]);
  const [locations, setLocations] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getEtablissementList(filter);
      setEtablissements(data);
      setLocations(
        data.map((etablissement) => ({
          id: etablissement.id,
          latitude: etablissement.latitude,
          longitude: etablissement.longitude,
          nom: etablissement.nom,
          adresse: etablissement.adresse,
        }))
      );
    };
    fetchData();
  }, [filter]);

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
