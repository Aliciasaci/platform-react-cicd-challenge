import { Button } from 'flowbite-react';
import { ListGroup } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

export default function ReservationsCard({ reservation }) {
 const { '@id': id, jour, creneau, prestation, status } = reservation;
 const { titre, description, duree, prix } = prestation;
 const [responseMessage, setResponseMessage] = useState("");
 const navigate = useNavigate()

 const displayResponseMessage = (message) => {
  setResponseMessage(message);

  setTimeout(() => {
   setResponseMessage("");
  }, 5000);
 };

 const annulerReservation = async () => {
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
        {(status === "created" || status === "updated") && (
         <>
          <button
           type="button"
           className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700 mr-2" onClick={handleDeplacement}>
           Déplacer
          </button>
          <button
           type="button"
           className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700" onClick={annulerReservation}>
           Annuler
          </button>
         </>
        )}
        {status === "canceled" && (
         <span className="text-red-500 font-semibold mr-2 tag">Annulée</span>
        )}
        {status !== "created" && status !== "updated" && (
         <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700" >
          Récupérer
         </button>
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
