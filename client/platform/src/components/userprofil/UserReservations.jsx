import { Link } from "react-router-dom";
import ReservationsCard from "./ReservationCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserReservations() {

    const [reservationsClient, setReservationsClient] = useState([]);

    useEffect(() => {
        const fetchReservationsInfos = async () => {
            try {
                const response = await axios.get(`https://127.0.0.1:8000/api/users/3`);
                if(response.status === 200){
                    setReservationsClient(response.data.reservationsClient);
                    console.log(response.data.reservationsClient);
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };
      
        fetchReservationsInfos();
    }, []);

    return (
        <div className="w-3/4">
            <div className="mt-10 ml-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Mes rendez-vous à venir</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Vous n'avez pas encore pris de rendez-vous.</p>
                <Link to="/" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Prendre rendez-vous</Link>
            </div>

            <div className="mt-5 ml-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Mes réservations</h5>
                </a>
                {reservationsClient.map((reservation, index) => (
                    <ReservationsCard key={index} reservation={reservation} />
                ))}
            </div>
        </div>
    );
}
