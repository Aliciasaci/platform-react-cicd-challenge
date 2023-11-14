import Calendar from "../components/Calendar"
import { Card } from 'flowbite-react';

export default function Reservation() {
    return (
        <div className="reservation h-screen w-screen bg-gray-100">
            <Card className="w-1/2 m-auto">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
            </Card>
            <Calendar />
        </div>
    )
}