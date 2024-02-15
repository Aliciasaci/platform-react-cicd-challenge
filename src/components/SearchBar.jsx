import React, { useState } from 'react';
import { res } from 'react-email-validator';
import { useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [searchInput1, setSearchInput1] = useState('');  // Que recherchez-vous ?
    const [searchInput2, setSearchInput2] = useState(''); // Ou ?
    const [searchInput3, setSearchInput3] = useState(''); // Autour de combien de km ?
    const [etablissements, setEtablissements] = useState([]);
    const [location, setLocation] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            setIsLoading(true); // Set loading to true at the beginning
    
            if (searchInput3 !== '') { // If distance is set
                // Function to get current location
                const getLocationAsync = () => {
                    return new Promise((resolve, reject) => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(
                                (position) => {
                                    const latitude = position.coords.latitude;
                                    const longitude = position.coords.longitude;
                                    setLocation({ latitude, longitude });
                                    resolve({ latitude, longitude }); // Resolve with location data
                                },
                                (error) => {
                                    console.error(error);
                                    reject(error);
                                }
                            );
                        } else {
                            console.error('Geolocation is not supported by this browser.');
                            reject('Geolocation is not supported by this browser.');
                        }
                    });
                };
    
                // Wait for location to be set
                const locationData = await getLocationAsync();
    
                // Once location is set, proceed with fetching data
                if (locationData) {
                    let distance = `${locationData.latitude},${locationData.longitude},${searchInput3}`;
                    if (searchInput1 !== '' && searchInput2 !== '') {
                        if (searchInput2.match(/^\d+$/)) {
                            fetchFilterResults(searchInput1, null, searchInput2, distance);
                        } else {
                            fetchFilterResults(searchInput1, searchInput2, null, distance);
                        }
                    } else if (searchInput1 === '' && searchInput2 !== '') {
                        if (searchInput2.match(/^\d+$/)) {
                            fetchFilterResults(null, null, searchInput2, distance);
                        } else {
                            fetchFilterResults(null, searchInput2, null, distance);
                        }
                    } else if (searchInput1 !== '' && searchInput2 === '') {
                        fetchFilterResults(searchInput1, null, null, distance);
                    } else {
                        fetchFilterResults(null, null, null, distance);
                    }
                }
            } else { // If distance is not set
                if (searchInput1 !== '' && searchInput2 !== '') {
                    if (searchInput2.match(/^\d+$/)) {
                        fetchFilterResults(searchInput1, null, searchInput2, null);
                    } else {
                        fetchFilterResults(searchInput1, searchInput2, null, null);
                    }
                } else if (searchInput1 === '' && searchInput2 !== '') {
                    if (searchInput2.match(/^\d+$/)) {
                        fetchFilterResults(null, null, searchInput2, null);
                    } else {
                        fetchFilterResults(null, searchInput2, null, null);
                    }
                } else if (searchInput1 !== '' && searchInput2 === '') {
                    fetchFilterResults(searchInput1,null,null,null);
                } else {
                    return;
                }
            }
        } catch (error) {
            console.error('Error handling search:', error);
        } finally {
            setIsLoading(false); // Reset loading to false after done
        }
    };

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
    }

    const error = (error) => {
        console.error(error);
    }

    const fetchFilterResults = async (searchInput,ville,codePostal,distance) => {
        try {
                                        alert("titre");
            let url = `${import.meta.env.VITE_SERVER_URL}/filter`;
            alert('titre');
            if (searchInput) {
                url += `?prestation.titre=${searchInput}`;
            }
            if (ville) {
                url += `${searchInput ? '&' : '?'}ville=${ville}`;
            }
            if (codePostal) {
                url += `${searchInput || ville ? '&' : '?'}codePostal=${codePostal}`;
            }
            if (distance) {
                url += `${searchInput || ville || codePostal ? '&' : '?'}distance=${distance}`;
            }
            const response = await axios.get(
                url,
                {
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );
            if (response.data && response.data.length > 0) {
                setEtablissements(response.data);
                navigate('/platform-react-cicd-challenge/etablissements', {
                    state: {
                        etablissements: response.data,
                    },
                });
            } else {
                try {
                    alert("nom");
                    let url = `${import.meta.env.VITE_SERVER_URL}/filter?nom=${searchInput}`;
                    if (searchInput) {
                        url += `?nom=${searchInput}`;
                    }
                    if (ville) {
                        url += `${searchInput ? '&' : '?'}ville=${ville}`;
                    }
                    if (codePostal) {
                        url += `${searchInput || ville ? '&' : '?'}codePostal=${codePostal}`;
                    }
                    if (distance) {
                        url += `${searchInput || ville || codePostal ? '&' : '?'}distance=${distance}`;
                    }
                    const response = await axios.get(
                        `${import.meta.env.VITE_SERVER_URL}/filter?nom=${searchInput}`,
                        {
                            headers: {
                                Accept: 'application/json',
                            },
                        }
                    );
                    if (response.data && response.data.length > 0) {
                        setEtablissements(response.data);
                        navigate('/platform-react-cicd-challenge/etablissements', {
                            state: {
                                etablissements: response.data,
                            },
                        });
                    } else {
                        try {
                            alert("category");
                            console.log(`${import.meta.env.VITE_SERVER_URL}/filter?prestation.category=${searchInput}`)
                            url = `${import.meta.env.VITE_SERVER_URL}/filter?prestation.category=${searchInput}`;
                            if (searchInput) {
                                url += `?prestation.category=${searchInput}`;
                            }
                            if (ville) {
                                url += `${searchInput ? '&' : '?'}ville=${ville}`;
                            }
                            if (codePostal) {
                                url += `${searchInput || ville ? '&' : '?'}codePostal=${codePostal}`;
                            }
                            if (distance) {
                                url += `${searchInput || ville || codePostal ? '&' : '?'}distance=${distance}`;
                            }
                            const response = await axios.get(
                                `${import.meta.env.VITE_SERVER_URL}/filter?prestation.category=${searchInput}`,
                                {
                                    headers: {
                                        Accept: 'application/json',
                                    },
                                }
                            );
                            if (response.data && response.data.length > 0) {
                                setEtablissements(response.data);
                                navigate('/platform-react-cicd-challenge/etablissements', {
                                    state: {
                                        etablissements: response.data,
                                    },
                                });
                            }
                        } catch (error) {
                            console.error('Error fetching information:', error);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching information:', error);
                }
            }

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
                    <div className="basis-2/5">
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
                    <div className="basis-3/5">
                        <label htmlFor="default-search3" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search3" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-white rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("Search_Km")} onChange={(e) => setSearchInput3(e.target.value)} required />
                            <div className="absolute inset-y-0 end-0 text-sm flex items-center pe-3 pointer-events-none text-gray-500 dark:text-gray-400">
                                {t("Search_Autour")}
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={handleSearch} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Rechercher</button>
                </div>
            </div>
        </div>
    );
}
