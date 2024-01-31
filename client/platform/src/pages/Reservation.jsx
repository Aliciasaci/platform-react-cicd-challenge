import Calendar from "../components/Calendar";
import { Card } from 'flowbite-react';
import { PrestationListGroup } from "../components/prestacomponents/PrestationListGroup";
import EmployesPrestation from "../components/EmployesPrestation";
import { useState } from "react";
import { Alert } from 'flowbite-react';

export default function Reservation({ prestation }) {
    const [prestationId, setPrestationId] = useState(1);  //*à remplacer par une donnée dynamique
    const [dataEmployesPrestation, setDataEmployesPrestation] = useState(null);

    const handleSelect = (data) => {
        setDataEmployesPrestation(data);
    };

    return (
        <div className="reservation h-full w-screen bg-gray-100">
            <div className="reservation-wrapper">
                <p className="normal-case text-gray-900 text-xl text-left title">1. Préstation sélectionnée</p>
                {/* <PrestationListGroup prestations={prestation} buttonContent={"Confirmer"} linkTo={"/prestation/"} /> */}
                <p className="normal-case text-gray-900 text-xl text-left title">2. Choix de l'employé</p>
                <EmployesPrestation prestationId={prestationId} handleSelect={handleSelect} />
                <p className="normal-case text-gray-900 text-xl text-left title">3. Choix de la date & heure</p>
                {dataEmployesPrestation ? (
                    <Calendar employeId={dataEmployesPrestation} />
                ) :
                    <Alert color="warning" withBorderAccent>
                        <span>
                            <span className="font-medium">Veuillez séléctionner un employé.</span>
                        </span>
                    </Alert>
                }
            </div>
        </div>
    );
}
