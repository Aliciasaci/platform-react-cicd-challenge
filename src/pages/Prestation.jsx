import { GalleryDisplay } from "../components/publicDisplayEtablissement/GalleryDisplay";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import RatingDetail from "../components/ratings/RatingDetail";
import RatingGeneral from "../components/ratings/RatingGeneral";
import { AppContext } from "../context";
import { PrestationListGroup } from "../components/publicDisplayEtablissement/PrestationListGroup";

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
                        <div className='items-start mb-4'>
                            <PrestationListGroup prestations={[prestation]} />
                        </div>
                    </div>
                    <RatingGeneral prestationId={prestationsId} notes={notes} />
                    <RatingDetail categorieId={categorieId} prestationId={prestationsId} notes={notes} />
                </div>
            )}
        </div>
    );
}
