import { GalleryDisplay } from "../components/publicDisplayEtablissement/GalleryDisplay";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RatingDetail from "../components/ratings/RatingDetail";
import RatingGeneral from "../components/ratings/RatingGeneral";


export default function Prestation() {
 const [prestation, setPrestation] = useState(null);
 const url = window.location.href.split("/");
 const prestationsId = url[url.length - 1];
 const [notes, setNotes] = useState([]);

 useEffect(() => {
  const fetchPrestation = async () => {
   try {
    const response = await axios.get(`https://127.0.0.1:8000/api/prestations/${prestationsId}`);
    setPrestation(response.data);
   } catch (error) {
    console.error('Error fetching prestation information:', error);
   }
  };

  fetchPrestation();
 }, []);

 useEffect(() => {
  const fetchNotesPerPrestation = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/prestations/${prestationsId}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.data) {
        setNotes(response.data.feedback);
      }
    } catch (error) {
      console.error('Error fetching information:', error);
    }
  };

  fetchNotesPerPrestation();
}, [prestationsId]);



 return (
  <div className="my-10 w-[60%]">
   {prestation && (
    <div>
     <div className="flex justify-between items-end">
      <div className="items-start">
       <h1 className="text-2xl text-black font-semibold">
        {prestation.titre}
       </h1>
       <span className="text text-black">
        {prestation.description}
       </span>
       <div className="flex items-center">
        <span className="text-gray-500 font-light">
         {prestation.duree * 30}mins
        </span>
        <span className="text-gray-300 mr-1 ml-1"> • </span>
        <span className="text-gray-500">
         {prestation.prix} €
        </span>
       </div>
      </div>
      <Link to="/">
       <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700" >
        Prendre RDV
       </button>
      </Link>
     </div>
     <GalleryDisplay className="w-full" />
     <RatingGeneral prestationId={prestationsId} notes={notes}></RatingGeneral>
     <RatingDetail prestationId={prestationsId} notes={notes}></RatingDetail>
    </div>
   )}
   </div>
 )
}