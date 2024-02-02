import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from '../../context';

export default function Login() {
    const { userToken, setUserToken } = useContext(AppContext);
    const { userEmail, setUserEmail } = useContext(AppContext);

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`https://127.0.0.1:8000/api/login`, {
                email: user.email,
                password: user.password,
            });

            if (res.data.token) {
                localStorage.setItem('userToken', res.data.token);
                setUserEmail(user.email);
                navigate('/user-profile');
            }
        } catch (error) {
            console.log(error);
            setResponseMessage('Erreur lors de la connexion. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-200 login">
            <div className=" flex justify-center items-center w-1/3 h-3/5 bg-white rounded-xl">
                <div>
                    {responseMessage && (<Alert className="p-2" color="failure" withBorderAccent>
                        <span>
                            <span className="p-2 font-medium">{responseMessage}</span>
                        </span>
                    </Alert>)}
                    <p className="capitalize text-zinc-900 text-xl text-center font-bold mb-4 w-96 pt-4" >SE CONNECTER</p>
                    <div className="form-group mb-3">
                        <div className="block flex justify-start mb-2">
                            <Label htmlFor="base" className='text-sm text-center font-bold' value="Email*" />
                        </div>
                        <TextInput id="base" type="text" placeholder="Addresse email" sizing="md" name="email" value={user.email} onChange={handleInput} required />
                    </div>
                    <div className="form-group mb-3">
                        <div className="block flex justify-start mb-2">
                            <Label htmlFor="base" className='text-sm text-center font-bold' value="Mot de passe*" />
                        </div>
                        <TextInput id="base" type="password" placeholder="*******" sizing="md" name="password" value={user.password} onChange={handleInput} required />
                    </div>
                    <Button onClick={handleSubmit} className="bg-zinc-800  uppercase w-full hover:bg-gray-700 text-white font-bold px-4 rounded-lg focus:outline-none focus:shadow-outline" >
                        Se connecter
                    </Button>
                    <div className="mt-6 text-zinc-900">
                        <hr className='text-zinc-900 mt-4'></hr>
                        <p className='mt-4'>Pas encore de compte ? </p>
                        <Link to="/register">
                            <Button className="border-gray-700 mt-2 bg-zinc-100 text-zinc-900 uppercase w-full font-bold px-4 rounded-lg focus:outline-none focus:shadow-outline" >
                                Créer mon compte
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}