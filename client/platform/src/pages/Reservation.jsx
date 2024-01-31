import React, { useState } from "react"; // Ajout de React
import axios from 'axios';
import Calendar from "../components/Calendar";
import EmployesPrestation from "../components/EmployesPrestation";
import { Alert } from 'flowbite-react';

export default function Reservation({ prestation }) {
    const [prestationId, setPrestationId] = useState(1);
    const [dataEmployesPrestation, setDataEmployesPrestation] = useState(null);
    const [responseMessage, setResponseMessage] = useState(""); // Ajout de la variable d'état responseMessage

    const handleSelect = (data) => {
        setDataEmployesPrestation(data);
    };

    const createReservation = async (selectedDateTime) => {
        const [datePart, timePart] = selectedDateTime.split(' ');
        
        try {
          const res = await axios.post(`https://127.0.0.1:8000/api/reservations`, {
            client: "/api/users/3",
            dateTime: "2024-01-31T13:07:29.730Z",
            prestation: `/api/prestations/${prestationId}`,
            employe: "/api/employes/1",
            status: "created",
            creneau : timePart,
            duree : 0,
            jour : datePart,
          });
    
          if (res.status === 201) { // Utilisation de === pour la comparaison
            alert("success");
          }
    
        } catch (error) {
          setResponseMessage(error.response.data.detail);
        }
    }

    return (
        <div className="reservation h-full w-screen bg-gray-100">
            <div className="reservation-wrapper">
                <p className="normal-case text-gray-900 text-xl text-left title">1. Préstation sélectionnée</p>
                {/* <PrestationListGroup prestations={prestation} buttonContent={"Confirmer"} linkTo={"/prestation/"} /> */}
                <p className="normal-case text-gray-900 text-xl text-left title">2. Choix de l'employé</p>
                <EmployesPrestation prestationId={prestationId} handleSelect={handleSelect} />
                <p className="normal-case text-gray-900 text-xl text-left title">3. Choix de la date & heure</p>
                {dataEmployesPrestation ? (
                    <Calendar employeId={dataEmployesPrestation} createReservation={createReservation}/> // Passage de la fonction createReservation en tant que prop
                ) :
                    <Alert color="warning" withBorderAccent>
                        <span>
                            <span className="font-medium">Veuillez sélectionner un employé.</span>
                        </span>
                    </Alert>
                }
            </div>
        </div>
    );
}
