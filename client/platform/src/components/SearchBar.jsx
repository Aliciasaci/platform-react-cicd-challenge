import React, { useState } from 'react';
import { res } from 'react-email-validator';
import { useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [searchInput1, setSearchInput1] = useState('');  // Que recherchez-vous ?
    const [searchInput2, setSearchInput2] = useState(''); // Ou ?
    const [etablissements, setEtablissements] = useState([]);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchInput1 !== '' && searchInput2 !== '') {
            console.log('Que recherchez-vous ? :', searchInput1);
            console.log('Ou ? ', searchInput2);
        } else if (searchInput1 !== '') {
            fetchFilterResults(searchInput1);
        } else if (searchInput2 !== '') {
            console.log('Ou ? ', searchInput2);
        } else {
            console.log('Aucune recherche n\'a été saisie');
        }
    };

    const fetchFilterResults = async (searchInput) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/filter/?prestation.titre=${searchInput}`,
                {
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );
            if (response.data && response.data.length > 0) {
                console.log("prestation titre");
                console.log(response.data);
                setEtablissements(response.data);
                navigate('/etablissements', {
                    state: {
                        etablissements: response.data,
                    },
                });
            } else {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_SERVER_URL}/filter/?nom=${searchInput}`,
                        {
                            headers: {
                                Accept: 'application/json',
                            },
                        }
                    );
                    if (response.data && response.data.length > 0) {
                        console.log("par nom");
                        console.log(response.data);
                        setEtablissements(response.data);
                    } else {
                        try {
                            const response = await axios.get(
                                `${import.meta.env.VITE_SERVER_URL}/filter/?prestation.category=${searchInput}`,
                                {
                                    headers: {
                                        Accept: 'application/json',
                                    },
                                }
                            );
                            if (response.data && response.data.length > 0) {
                                console.log("par catégorie");
                                console.log(response.data);
                                setEtablissements(response.data);
                            }
                        } catch (error) {
                            console.error('Error fetching information:', error);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching information:', error);
                }
            }

            // Appel de navigate une fois que la recherche est terminée
         

        } catch (error) {
            console.error('Error fetching information:', error);
        }
    };


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="searchbar">
                <div className="flex justify-between" >
                    <div className="basis-1/2">
                        <label htmlFor="default-search1" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search1" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-white rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("Search_LookingFor")} onChange={(e) => setSearchInput1(e.target.value)} required />
                        </div>
                    </div>
                    <div className="basis-1/2">
                        <label htmlFor="default-search2" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search2" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-white rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("Search_Where")} onChange={(e) => setSearchInput2(e.target.value)} required />
                        </div>
                    </div>
                    <button type="button" onClick={handleSearch} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Rechercher</button>
                </div>
            </div>
        </div>
    );
}
