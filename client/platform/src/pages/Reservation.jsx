import Calendar from "../components/Calendar"
import { Card } from 'flowbite-react';
import { PrestationListGroup } from "../components/prestacomponents/PrestationListGroup";

export default function Reservation({ prestation }) {
    return (
        <div className="reservation h-screen w-screen bg-gray-100">
            <div className="reservation-wrapper">
                <p class="normal-case text-gray-900 text-xl text-left title" style={{}}>1. Préstation séléctionnée</p>
                <PrestationListGroup prestations={prestation} buttonContent={"Confirmer"} linkTo={"/prestation/"}/>
                <p class="normal-case text-gray-900 text-xl text-left title">2. Choix de la date & heure</p>
                <Calendar />
            </div>
        </div>
    )
}