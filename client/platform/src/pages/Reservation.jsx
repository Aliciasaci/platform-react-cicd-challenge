import Calendar from "../components/Calendar";
import { Card } from 'flowbite-react';
import { PrestationListGroup } from "../components/prestacomponents/PrestationListGroup";
import EmployesPrestation from "../components/EmployesPrestation";
import { useState } from "react";

export default function Reservation({ prestation }) {
    const [prestationId, setPrestationId] = useState(1);  //*à remplacer par une donnée dynamique

    const [dataEmployesPrestation, setDataEmployesPrestation] = useState(null);

    // Fonction de rappel pour recevoir les données du composant enfant
    const receiveDataFromChild = (data) => {
        setDataEmployesPrestation(data);
    };

    return (
        <div className="reservation h-full w-screen bg-gray-100">
            <div className="reservation-wrapper">
                <p className="normal-case text-gray-900 text-xl text-left title">1. Préstation sélectionnée</p>
                {/* <PrestationListGroup prestations={prestation} buttonContent={"Confirmer"} linkTo={"/prestation/"} /> */}

                <p style={{ "color": "red" }}>on suppose que la prestation choisie a l'id = 1, établissement = 1</p>
                <p className="normal-case text-gray-900 text-xl text-left title">2. Choix de l'employé</p>
                <EmployesPrestation prestationId={prestationId} sendEmployeData={receiveDataFromChild} />
                <p> donnee de prestation {dataEmployesPrestation} </p> 
                <p className="normal-case text-gray-900 text-xl text-left title">3. Choix de la date & heure</p>
                {prestationId && (
                    <Calendar />
                )}
            </div>
        </div>
    );
}
