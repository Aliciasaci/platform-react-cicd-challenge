import { Button } from 'flowbite-react';
import { ListGroup } from "flowbite-react";
import { useNavigate } from "react-router-dom";



export default function ReservationsCard({ reservation }) {
 const { '@id': id, jour, creneau, prestation } = reservation;
 const { titre, description, duree, prix } = prestation;
 const dureeEnMinutes = duree * 30;
 const navigate = useNavigate()
 const handleDeplacement = () => {
  // let idReservationArray = id.split('/')
  let idPrestationArray = prestation["@id"].split('/')
  // console.log(reservation)
  // console.log(prestation)
  navigate(`/reservation`, {
   state: {
    prestationId: idPrestationArray[idPrestationArray.length-1],
    mode: "update",
    reservation: reservation
   },
  });
  // window.location.href = `/reservation/${url[url.length - 1]}`
 }

 return (
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
       <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700 mr-2" onClick={handleDeplacement}>
        Déplacer
       </button>
       <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700">
        Annuler
       </button>
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
 );
}
