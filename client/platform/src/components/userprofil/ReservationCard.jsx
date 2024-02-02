import { Button } from 'flowbite-react';

export default function ReservationsCard({ reservation }) {
 const { '@id': id, jour, creneau, prestation } = reservation;
 const { titre, description, duree, prix } = prestation;
 const dureeEnMinutes = duree * 30;

 return (
  <a href="#" className="m-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row  dark:border-gray-700 dark:bg-gray-800">
   <img className="object-cover w-full rounded-t-lg md:w-48 md:rounded-none md:rounded-l-lg" style={{ "max-height": "12rem" }} src="https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGJpcnRoZGF5fGVufDB8fDB8fHww" alt={titre} />
   <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{titre}</h5>
    <p className="mb-3 font-normal text-gray-900 dark:text-gray-400">{description}</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
     Le <b>{jour}</b> à <b>{creneau}</b><br />
     Durée: <b>{dureeEnMinutes} minutes</b><br />
     <p className='text-green-700'>Prix: <b>{prix}€</b></p>
    </p>
   </div>
   <Button color="dark" style={{"margin-top": "6rem"}}>Annuler</Button>
  </a>
 );
}
