import React, { useState } from 'react';
import { Button, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { useContext } from 'react';

const Header = () => {
    const { userToken } = useContext(AppContext);

    const loginButton = userToken ? (
        <Link to="/user-profile">
            <Button type="button" className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-s me-2 mb-2 text-white dark:focus:ring-gray-700 dark:border-gray-700">
                Alicia
            </Button>
        </Link>
    ) : (
        <Link to="/login">
            <Button type="button" className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-s me-2 mb-2 text-white dark:focus:ring-gray-700 dark:border-gray-700">
                Se connecter
            </Button>
        </Link>
    );

    return (
        <Navbar fluid>
            <Navbar.Brand>
                <Link to="/" className="self-center whitespace-nowrap text-xl font-semibold dark:text-white logo">
                    PICKME
                </Link>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Link to="/reservation">
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">
                        Reservation
                    </Button>
                </Link>
                <Link to="/">
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">
                        Accueil
                    </Button>
                </Link>
                <Link to="/backoffice/admin-panel">
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">
                        Admin Panel
                    </Button>
                </Link>
                <Link to="/prestataire-register">
                    <Button type="button" className="text-black bg-gray-200 hover:bg-gray-200 rounded-lg text-sm me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700">
                        Je suis prestataire
                    </Button>
                </Link>
                {loginButton}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse />
        </Navbar>
    );
};

export default Header;
