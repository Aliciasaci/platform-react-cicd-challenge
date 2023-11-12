import { Button, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Navbar fluid className='w-screen'>
            <Navbar.Brand >
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white logo">PICKME</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Link to="/">
                    <button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">Accueil</button>
                </Link>
                <Link to="/admin-panel">
                    <button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">Admin Panel</button>
                </Link>
                <Link to="/prestataire-register">
                    <button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">Je suis prestataire</button>
                </Link>
                <Link to="/client-register">
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">Se connecter</button>
                </Link>

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {/* <Navbar.Link href="#" active>
                    Home
                </Navbar.Link> */}
                {/* <Navbar.Link href="#">About</Navbar.Link>
                <Navbar.Link href="#">Services</Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link> */}
            </Navbar.Collapse>
        </Navbar>
    );
}