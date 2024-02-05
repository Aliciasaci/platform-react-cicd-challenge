import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from '../../context';
import { useContext } from "react";
import ReservationsCard from './ReservationCard';


export default function CancelledReservations() {
    const { userId } = useContext(AppContext);
    const [reservationsClient, setReservationsClient] = useState([]);

    useEffect(() => {
        const fetchReservationsInfos = async () => {
            try {
                const response = await axios.get(`https://127.0.0.1:8000/api/users/${userId}`);
                if(response.status === 200){
                    const filteredReservations = response.data.reservationsClient.filter(reservation => reservation.status == "canceled");
                    setReservationsClient(filteredReservations);
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };
      
        fetchReservationsInfos();
    }, [userId]);

    return (
        <div className="w-3/4">
            <div className="mt-10 ml-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="text-2xl font-semibold text-black">Mes réservations</h5>
                </a>
                {reservationsClient.map((reservation, index) => (
                    <ReservationsCard key={index} reservation={reservation} />
                ))}
            </div>
        </div>
    );
}
