import UserInformations from "../components/userprofil/UserInformations";
import UserReservations from "../components/userprofil/UserReservations";
import CancelledReservations from "../components/userprofil/CancelledReservations";
import { useState } from "react";
import { Dropdown } from 'flowbite-react';


export default function ProfilUser() {
  const [selectedTab, setSelectedTab] = useState('rendez-vous');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-3/4 mb-8">
      <div className="bg-gray-100 flex w-full justify-between">
        <div className="mt-10 mr-2 w-1/4 block p-6 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="text-2xl font-semibold text-black mb-4">Mon compte</h5>
          <ul className="list-none">
            <li className={`pt-2 ${selectedTab === 'rendez-vous' ? 'text-zinc-800 font-semibold' : 'text-gray-800'}`} onClick={() => handleTabClick('rendez-vous')} >
            • Mes rendez-vous
            </li>
            <li className={`pt-2 ${selectedTab === 'mon-compte' ? 'text-gray-800 font-semibold' : 'text-gray-800'}`} onClick={() => handleTabClick('mon-compte')}>
            • Mes informations
            </li>
            <li className="pt-2 text-gray-600">Réservations</li>
            <li className={`ml-2 pt-1 ${selectedTab === 'reservations' ? 'text-gray-800 font-semibold' : 'text-gray-800'}`} onClick={() => handleTabClick('reservations')}>
            • A venir
            </li>
            <li className={`ml-2 pt-1 ${selectedTab === 'cancelled-reservations' ? 'text-gray-800 font-semibold' : 'text-gray-800'}`} onClick={() => handleTabClick('cancelled-reservations')}>
            • Annulées
            </li>
            <li className={`ml-2 pt-1 ${selectedTab === 'past-reservations' ? 'text-gray-800 font-semibold' : 'text-gray-800'}`} onClick={() => handleTabClick('past-reservations')}>
            • Passées
            </li>
          </ul>
          <hr className="mt-6 mb-6"></hr>
          <p className="font-normal text-red-500">Se déconnecter</p>
        </div>
        {selectedTab === "rendez-vous" && (
          <UserReservations></UserReservations>
        )}
        {selectedTab === "mon-compte" && (
          <UserInformations></UserInformations>
        )}
        {selectedTab === "cancelled-reservations" && (
          <CancelledReservations></CancelledReservations>
        )}
        {selectedTab === "reservations" && (
          <UserReservations></UserReservations>
        )}
      </div>
    </div>
  );
}
