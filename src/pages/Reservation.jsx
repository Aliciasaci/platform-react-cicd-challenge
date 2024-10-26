import Calendar from "../components/calendar/Calendar";
import { PrestationListGroup } from "../components/publicDisplayEtablissement/PrestationListGroup";
import EmployesPrestation from "../components/EmployesPrestation";
import React, { useState, useEffect } from "react";
import { Alert } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context";

export default function Reservation() {
    const location = useLocation();
    const navigate = useNavigate();
    const prestationId = location.state.prestationId;
    const mode = location.state.mode;
    const reservation = location.state.reservation;
    const { userId } = useContext(AppContext);
    const [prestation, setPrestation] = useState([]);
    const [dataEmployesPrestation, setDataEmployesPrestation] = useState(null);
    const [employesPrestation, setEmployesPrestation] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const storedToken = localStorage.getItem("userToken");

    // Fetch prestation data
    useEffect(() => {
        const fetchPrestation = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/prestations/${prestationId}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                const prestationData = response.data;
                console.log(prestationData);
                // Set prestation and employees
                setPrestation([prestationData]);
                setEmployesPrestation(prestationData.etablissement.employes);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching prestation data:", err);
                setError(err);
                setIsLoading(false);
            }
        };

        fetchPrestation();
    }, [prestationId, storedToken]);

    const handleSelect = (data) => {
        setDataEmployesPrestation(data);
    };

    if (isLoading) {
        return (
            <div className='h-screen mt-52'>
                <Spinner color='gray' size='xl' />
            </div>
        );
    }

    if (error) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <Alert color='red'>
                    <span>
                        <span className='font-medium'>Erreur:</span> Impossible de récupérer les données de la
                        prestation.
                    </span>
                </Alert>
            </div>
        );
    }

    const displayResponseMessage = (message) => {
        setResponseMessage(message);

        setTimeout(() => {
            setResponseMessage("");
        }, 5000);
    };

    const createReservation = async (selectedDateTime) => {
        const [datePart, timePart] = selectedDateTime.split(" ");
        if (mode === "create") {
            const presta = prestation[0];
            console.log(presta);
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/reservations`,
                    {
                        client: `/api/users/${userId}`,
                        prestation: `/api/prestations/${prestationId}`,
                        employe: `/api/employes/${dataEmployesPrestation}`,
                        status: "created",
                        etablissement: `/api/etablissements/${presta.etablissement.id}`,
                        creneau: timePart,
                        duree: parseInt(presta.duree),
                        jour: datePart,
                    },
                    {
                        headers: {
                            Accept: "application/ld+json",
                            Authorization: `Bearer ${storedToken}`,
                        },
                    }
                );

                if (res.status === 201) {
                    displayResponseMessage("Réservation confirmée.");
                    // Ajout du créneau à la liste des indisponibilités
                    createIndisponibilite(selectedDateTime);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            const reservationId = reservation["@id"].split("/").pop();
            if (mode === "update") {
                try {
                    const res = await axios.patch(
                        `${import.meta.env.VITE_SERVER_URL}/reservations/${reservationId}`,
                        {
                            status: "updated",
                            creneau: timePart,
                            duree: prestation.duree,
                            jour: datePart,
                        },
                        {
                            headers: {
                                "Content-Type": "application/merge-patch+json",
                                Authorization: `Bearer ${storedToken}`,
                            },
                        }
                    );

                    if (res.status === 200) {
                        displayResponseMessage(`Réservation déplacée pour le ${datePart} à ${timePart}.`);
                        createIndisponibilite(selectedDateTime);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const res = await axios.patch(
                        `${import.meta.env.VITE_SERVER_URL}/reservations/${reservationId}`,
                        {
                            status: "created",
                            creneau: timePart,
                            duree: prestation.duree,
                            jour: datePart,
                        },
                        {
                            headers: {
                                "Content-Type": "application/merge-patch+json",
                                Authorization: `Bearer ${storedToken}`,
                            },
                        }
                    );

                    if (res.status === 200) {
                        displayResponseMessage(`Réservation récupérée pour le ${datePart} à ${timePart}.`);
                        createIndisponibilite(selectedDateTime);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    const createIndisponibilite = async (selectedDateTime) => {
        const [datePart, timePart] = selectedDateTime.split(" ");

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/indisponibilites`,
                {
                    employe: `/api/employes/${dataEmployesPrestation}`,
                    creneau: timePart,
                    jour: datePart,
                },
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );

            if (res.status === 201) navigate("/platform-react-cicd-challenge/user-profile");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='reservation h-full w-screen bg-gray-100'>
            <div className='reservation-wrapper'>
                <p className='normal-case text-gray-900 text-xl text-left title'>1. Préstation sélectionnée</p>
                <PrestationListGroup prestations={prestation} linkTo={""} mode={mode} reservation={reservation} />
                <div>
                    <p className='normal-case text-gray-900 text-xl text-left title'>2. Choix de l&apos;employé</p>
                    <EmployesPrestation employesPrestation={employesPrestation} handleSelect={handleSelect} />
                </div>
                <p className='normal-case text-gray-900 text-xl text-left title'>3. Choix de la date & heure</p>
                {responseMessage && (
                    <div
                        className={`fade-out p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400`}
                        role='alert'
                    >
                        <span className='font-medium'> {responseMessage} </span>
                    </div>
                )}
                {dataEmployesPrestation ? (
                    <Calendar employeId={dataEmployesPrestation} createReservation={createReservation} />
                ) : (
                    <Alert color='warning' withBorderAccent>
                        <span>
                            <span className='font-medium'>Veuillez sélectionner un employé.</span>
                        </span>
                    </Alert>
                )}
            </div>
        </div>
    );
}
