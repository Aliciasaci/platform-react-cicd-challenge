export default function UserReservationsCard() {
    return (
            <div className="w-3/4 mt-10 ml-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Mes rendez-vous à venir</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Vous n'avez pas encore pris de rendez-vous.</p>
                <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Prendre rendez-vous</button>
            </div>
    )
}