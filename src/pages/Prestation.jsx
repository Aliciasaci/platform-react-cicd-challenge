import { GalleryDisplay } from "../components/publicDisplayEtablissement/GalleryDisplay";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import RatingDetail from "../components/ratings/RatingDetail";
import RatingGeneral from "../components/ratings/RatingGeneral";
import { AppContext } from "../context";

export default function Prestation() {
    const [prestation, setPrestation] = useState(null);
    const [categorieId, setCategorieId] = useState(null);
    const { userToken } = useContext(AppContext);
    const [notes, setNotes] = useState([]);
    const url = window.location.href.split("/");
    const prestationsId = url[url.length - 1];

    useEffect(() => {
        const fetchPrestation = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/prestations/${prestationsId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                setPrestation(response.data);
                const categoryUrl = response.data.category["@id"].split("/");
                setCategorieId(categoryUrl[categoryUrl.length - 1]);
            } catch (error) {
                console.error("Error fetching prestation information:", error);
            }
        };

        fetchPrestation();
    }, [prestationsId]);

    useEffect(() => {
        const fetchNotesPerPrestation = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/prestations/${prestationsId}`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                if (response.data) {
                    if (response.data.feedback.length > 0) {
                        setNotes(response.data.feedback);
                    }
                }
            } catch (error) {
                console.error("Error fetching information:", error);
            }
        };

        fetchNotesPerPrestation();
    }, [prestationsId]);

    return (
        <div className='my-10 w-[60%]'>
            {prestation && (
                <div>
                    <div className='flex justify-between items-end'>
                        <div className='items-start'>
                            <h1 className='text-2xl text-black font-semibold'>{prestation.titre}</h1>
                            <span className='text text-black'>{prestation.description}</span>
                            <div className='flex items-center'>
                                <span className='text-gray-500 font-light'>{prestation.duree * 30}mins</span>
                                <span className='text-gray-300 mr-1 ml-1'> • </span>
                                <span className='text-gray-500'>{prestation.prix} €</span>
                            </div>
                        </div>
                        {/* <Link to="/platform-react-cicd-challenge/reservations/">
              <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700" >
                Prendre RDV
              </button>
            </Link> */}
                    </div>
                    <GalleryDisplay className='w-full' />
                    <RatingGeneral prestationId={prestationsId} notes={notes} />
                    <RatingDetail categorieId={categorieId} prestationId={prestationsId} notes={notes} />
                </div>
            )}
        </div>
    );
}
