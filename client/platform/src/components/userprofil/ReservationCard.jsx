import { Button } from 'flowbite-react';
import { ListGroup } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReservationsCard({ reservation, mode }) {
 const { '@id': id, jour, creneau, prestation, status } = reservation;
 const { titre, description, duree, prix } = prestation;
 const [responseMessage, setResponseMessage] = useState("");
 const [indisponibilites, setIndisponibilites] = useState([]);
 const navigate = useNavigate()
 const idEmploye = reservation.employe.split('/')[reservation.employe.split('/').length - 1]

 const displayResponseMessage = (message) => {
  setResponseMessage(message);
  setTimeout(() => {
   setResponseMessage("");
  }, 5000);
 };

 useEffect(() => {
  const getIndisponibiliteEmploye = async () => {
   try {
    const response = await axios.get(
     `${import.meta.env.VITE_SERVER_URL}/employes/${idEmploye}`,
     {
      headers: {
       Accept: "application/json",
      },
     }
    );
    if (response.data) {
     setIndisponibilites(response.data.indisponibilites);
    }
   } catch (error) {
    console.error("Error fetching user information:", error);
   }
  };

  getIndisponibiliteEmploye();
 }, [idEmploye]);

 const handleRecuperation = async () => {
  let idPrestationArray = prestation["@id"].split('/')
  navigate(`/reservation`, {
   state: {
    prestationId: idPrestationArray[idPrestationArray.length - 1],
    mode: "retake",
    reservation: reservation
   }
  })
 }


 const annulerReservation = async () => {
  let indispoList = indisponibilites.filter((indispo) => (indispo.jour == reservation.jour) && (indispo.creneau == reservation.creneau))
  if (indispoList.length > 0) {
   let indispoId = indispoList[0].id
   try {
    const res = await axios.delete(`https://127.0.0.1:8000/api/indisponibilites/${indispoId}`, {
    },
     {
      headers: {
       'Content-Type': 'application/merge-patch+json'
      }
     }
    );
    if (res.status === 200) {
     console.log(`Indipo annulée.`);
    }
   } catch (error) {
    console.log(error);
   }
   try {
    const res = await axios.patch(`https://127.0.0.1:8000${id}`, {
     status: "canceled",
    },
     {
      headers: {
       'Content-Type': 'application/merge-patch+json'
      }
     }
    );
    if (res.status === 200) {
     displayResponseMessage(`Réservation annulée.`);
    }
   } catch (error) {
    console.log(error);
   }
  }
 };

 const handleDeplacement = () => {
  let idPrestationArray = prestation["@id"].split('/')
  navigate(`/reservation`, {
   state: {
    prestationId: idPrestationArray[idPrestationArray.length - 1],
    mode: "update",
    reservation: reservation
   },
  });
 };


 const handleClick = () => {
  let idPrestationArray = prestation["@id"].split('/');
  let prestationId = idPrestationArray[idPrestationArray.length - 1];
  navigate('/prestations/1', { replace: true });
 };


 return (
  <>
   {responseMessage && (
    <div
     className={`fade-out p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400`}
     role="alert">
     <span className="font-medium"> {responseMessage} </span>
    </div>
   )}
   <ListGroup className="mt-2 resa">
    <div className="w-full mx-3 my-2 p-2">
     <div className="flex flex-row justify-between items-center">
      <p className="text-light text-black">
       {titre}
      </p>
      <div className="flex items-center mr-8">
       <div className="mr-8">
        <span className="text-gray-500 font-light">
         {duree * 30}mins
        </span>
        <span className="text-gray-300"> • </span>
        <span className="text-gray-500">
         {prix} €
        </span>
       </div>
       <div>
        {mode === "futur" && (
         <>
          <button
           type="button"
           className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700 mr-2" onClick={handleDeplacement}>
           Déplacer
          </button>
          {indisponibilites &&
           <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700" onClick={annulerReservation}>
            Annuler
           </button>
          }
         </>
        )}
        {mode === "canceled" && (
         <>
          <span className="text-red-500 font-semibold mr-2 tag">Annulée</span>
          <button
           type="button"
           className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700" onClick={handleRecuperation}>
           Récupérer
          </button>
         </>
        )}
        {mode === "past" && (
         <>
          <span className="text-gray-50 font-semibold mr-2 tag-past">Passée</span>
          <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700" onClick={handleClick} >
           Laisser un avis ➜
          </button>
         </>
        )}

       </div>
      </div>
     </div>
     {description && (
      <div>
       <p className="text-gray-500 my-2 font-light">
        {description}
       </p>
      </div>
     )}
     <div className="text-gray-500">{jour} • {creneau}</div>
    </div>
   </ListGroup>
  </>
 );
}
