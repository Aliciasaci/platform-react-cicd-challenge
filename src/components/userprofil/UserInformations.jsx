import React, { useState } from 'react';
import axios from 'axios'; // Import axios

export default function UserInformations({ userInfo }) {
    const [successMessage, setSuccessMessage] = useState("");
    const [newPassword, setNewPassword] = useState(""); // State to store new password

    const handleChangePassword = async () => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/users/${userInfo.id}`, {
                password: newPassword 
            },
                {
                    headers: {
                        'Content-Type': 'application/merge-patch+json',
                    },
                });

            setSuccessMessage("Mot de passe modifié avec succès !");
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value); 
    };

    return (
        <div className="flex flex-col w-3/4">
            <div className="mt-10 ml-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="text-xl text-gray-800 mb-4">Mes coordonnées</h5>
                <div className="mb-6 flex">
                    <div className="w-1/2 mr-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Prénom*</label>
                        <input
                            type="text"
                            value={userInfo.prenom}
                            className="text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500"
                        />
                    </div>
                    <div className="w-1/2 ml-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Nom*</label>
                        <input type="text"
                            className="text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500"
                            value={userInfo.nom}
                        />
                    </div>
                </div>
                <div className="mb-6 flex">
                    <div className="w-1/2 mr-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Email*</label>
                        <input type="text"
                            value={userInfo.email}
                            className="text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500"></input>
                    </div>
                </div>

            </div>
            <div className="mt-10 ml-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div href="#">
                    <h5 className="text-xl text-gray-800 mb-4">Mot de passe</h5>
                    <p className="mb-2 text-gray-900">Pour modifier votre mot de passe, veuillez saisir votre mot de passe actuel pour confirmer votre identité.</p>
                </div>
                <div className="mb-6 flex">
                    <div className="w-1/2">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Nouveau mot de passe</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            className="text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500"
                        />
                    </div>
                </div>
                <button onClick={handleChangePassword} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Modifier</button>
                {successMessage && <p className="text-green-600">{successMessage}</p>}
            </div>
        </div>
    );
}
