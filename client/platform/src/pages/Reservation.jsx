import Calendar from "../components/Calendar"
import { Card } from 'flowbite-react';
import { PrestationListGroup } from "../components/prestacomponents/PrestationListGroup";

export default function Reservation({ prestation }) {
    return (
        <div className="reservation h-full w-screen bg-gray-100">
            <div className="reservation-wrapper">
<<<<<<< HEAD
                <p class="normal-case text-gray-900 text-xl text-left title">1. Préstation séléctionnée</p>
                <Card className="m-auto" style={{ "width": "57rem" }}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Noteworthy technology acquisitions 2021
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                </Card>
=======
                <p class="normal-case text-gray-900 text-xl text-left title" style={{}}>1. Préstation séléctionnée</p>
                <PrestationListGroup prestations={prestation} buttonContent={"Confirmer"} linkTo={"/prestation/"}/>
>>>>>>> dev
                <p class="normal-case text-gray-900 text-xl text-left title">2. Choix de la date & heure</p>
                <Calendar />
            </div>
        </div>
    )
}