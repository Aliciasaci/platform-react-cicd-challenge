import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Register() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        nom: "",
        prenom: "",
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });

        console.log(user);
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`https://127.0.0.1:8000/api/users`, {
                email: user.email,
                plainPassword: user.password,
                nom: user.nom,
                prenom: user.prenom,
            });
            
            if (res.status == 201) {
                setResponseMessage("Compte crée avec success !");
            }

        } catch (error) {
            setResponseMessage(error.response.data.detail);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-200 login">
            <div className=" flex justify-center items-center w-1/3 pt-6 pb-8 bg-white rounded-xl">
                <div>
                    {responseMessage && (<Alert color="info" withBorderAccent>
                        <span>
                            <span className="font-medium">{responseMessage}</span>
                        </span>
                    </Alert>)}
                    <p className="capitalize text-zinc-900 text-2xl text-center font-bold mb-8 w-96" >Créer mon compte</p>
                    <div className="form-group mb-5">
                        <div className="block flex justify-start mb-2">
                            <Label htmlFor="base" className='text-xl text-center font-bold' value="Nom" />
                        </div>
                        <TextInput id="base" type="text" placeholder="Nom" sizing="md" name="nom" value={user.nom} onChange={handleInput} />
                    </div>
                    <div className="form-group mb-5">
                        <div className="block flex justify-start mb-2">
                            <Label htmlFor="base" className='text-xl text-center font-bold' value="Prénom" />
                        </div>
                        <TextInput id="base" type="text" placeholder="Prénom" sizing="md" name="prenom" value={user.prenom} onChange={handleInput} />
                    </div>
                    <div className="form-group mb-5">
                        <div className="block flex justify-start mb-2">
                            <Label htmlFor="base" className='text-xl text-center font-bold' value="Email " />
                        </div>
                        <TextInput id="base" type="text" placeholder="Addresse email" sizing="md" name="email" value={user.email} onChange={handleInput} />
                    </div>
                    <div className="form-group mb-5">
                        <div className="block flex justify-start mb-2">
                            <Label htmlFor="base" className='text-xl text-center font-bold' value="Mot de passe" />
                        </div>
                        <TextInput id="base" type="password" placeholder="*******" sizing="md" name="password" value={user.password} onChange={handleInput} />
                    </div>
                    <Button onClick={handleSubmit} className="bg-zinc-800  uppercase w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" >
                        Créer mon compte
                    </Button>
                    <div className="mt-6 text-zinc-900">
                        <hr className='text-zinc-900 mt-4'></hr>
                        <p className='mt-4'>Vous avez déjà un compte ? </p>
                        <Link to="/login">
                            <button className="mt-3 bg-zinc-800 uppercase w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" >
                                Se connecter
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}