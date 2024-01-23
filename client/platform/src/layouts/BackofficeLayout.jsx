import NavBarCustom from '../components/NavBarCustom';
import SideBarCustom from '../components/SideBarCustom';
import { Outlet } from 'react-router-dom'

export default function BackOfficeLayout() {
    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <NavBarCustom />
            <SideBarCustom />
            <main className="p-4 md:ml-64 h-auto pt-20">
            <Outlet />
            </main>
        </div>
    )
}