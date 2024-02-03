import { FaUsers, FaList, FaBuilding, FaClipboardQuestion } from 'react-icons/fa6';

export default function SideBar() {
    return (    
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidenav"
            id="drawer-navigation" >
            <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                <ul className="space-y-2">
                    <li>       
                        <a
                        href="/backoffice/admin/users"
                        className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                        <FaUsers size={20} />
                        <span className="ml-3">Utilisateurs</span>
                        </a>
                    </li>
                    <li>
                        <a
                        href="/backoffice/admin/categories"
                        className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                        <FaList size={20} />
                        <span className="ml-3">Catégories</span>
                        </a>
                    </li>
                    <li>
                        <a
                        href="/backoffice/admin/etablissements"
                        className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                        <FaBuilding size={20} />
                        <span className="ml-3">Etablissements</span>
                        </a>
                    </li>
                    <li>
                        <a
                        href="/backoffice/admin/demandes-prestataire"
                        className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                        <FaClipboardQuestion size={20} />
                        <span className="ml-3">Demandes Prestataire</span>
                        </a>
                    </li>
                    <li>
                        <a
                        href="/backoffice/prestataire/employes"
                        className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                        >
                        <FaUsers size={20} />
                        <span className="ml-3">Employes</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}