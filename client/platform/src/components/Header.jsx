<<<<<<< HEAD
=======
import React, { useContext, useEffect } from 'react';
>>>>>>> dc6a5785fe3a0b13b84081d3aa17aaa73b3fbed3
import { Button, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { useState } from 'react';

<<<<<<< HEAD
export default function Header() {
=======
const Header = () => {
    const { userToken, setUserToken } = useContext(AppContext);

    useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        if (storedToken) {
            setUserToken(storedToken);
        }
    }, []);

    const loginButton = userToken ? (
        <Link to="/user-profile">
            <Button type="button" className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-s me-2 mb-2 text-white dark:focus:ring-gray-700 dark:border-gray-700">
            Profile
            </Button>
        </Link>
    ) : (
        <Link to="/login">
            <Button type="button" className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-s me-2 mb-2 text-white dark:focus:ring-gray-700 dark:border-gray-700">
                Se connecter
            </Button>
        </Link>
    );

>>>>>>> dc6a5785fe3a0b13b84081d3aa17aaa73b3fbed3
    return (
        <Navbar fluid>
            <Navbar.Brand >
                {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white logo">PICKME</span> */}
                <Link to="/" className="self-center whitespace-nowrap text-xl font-semibold dark:text-white logo">
                    PICKME
                </Link>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Link to="/reservation">
<<<<<<< HEAD
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">Reservation</Button>
                </Link>
                <Link to="/">
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">Accueil</Button>
                </Link>
                <Link to="/backoffice/admin-panel">
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">Admin Panel</Button>
                </Link>
                <Link to="/prestataire/register">
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">Je suis prestataire</Button>
                </Link>
                <Link to="/login">
                    <Button type="button" className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-s me-2 mb-2 text-white dark:focus:ring-gray-700 dark:border-gray-700">Se connecter</Button>
=======
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">
                        Reservation
                    </Button>
                </Link>
                <Link to="/">
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">
                        Accueil
                    </Button>
                </Link>
                <Link to="/prestataire-register">
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">
                        Je suis prestataire
                    </Button>
>>>>>>> dc6a5785fe3a0b13b84081d3aa17aaa73b3fbed3
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