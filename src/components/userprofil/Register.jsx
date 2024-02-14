import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useState } from "react";
import { Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Register({ }) {
  const { t } = useTranslation();
  const [user, setUser] = useState({
    email: "",
    password: "",
    nom: "",
    prenom: "",
  });


  const [responseMessage, setResponseMessage] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async () => {

    console.log(user);
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users`, {
        email: user.email,
        plainPassword: user.password,
        nom: user.nom,
        prenom: user.prenom,
      },
        {
          headers: {
            Accept: 'application/json',
          },
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
          {responseMessage && (
            <Alert color="info" withBorderAccent>
              <span>
                <span className="font-medium">{responseMessage}</span>
              </span>
            </Alert>
          )}
          <p className="capitalize text-zinc-900 text-xl text-center font-bold mb-4 w-96 pt-4">
            {t("Common_CreateAccount")}
          </p>
          <div className="form-group mb-3">
            <div className="block flex justify-start mb-2">
              <Label
                htmlFor="base"
                className="text-sm text-center font-bold"
                value="Nom*"
              />
            </div>
            <TextInput
              id="base"
              type="text"
              placeholder="Nom"
              sizing="md"
              name="nom"
              value={user.nom}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group mb-3">
            <div className="block flex justify-start mb-2">
              <Label
                htmlFor="base"
                className="text-sm text-center font-bold"
                value="Prénom*"
              />
            </div>
            <TextInput
              id="base"
              type="text"
              placeholder="Prénom"
              sizing="md"
              name="prenom"
              value={user.prenom}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group mb-3">
            <div className="block flex justify-start mb-2">
              <Label
                htmlFor="base"
                className="text-sm text-center font-bold"
                value="Email*"
              />
            </div>
            <TextInput
              id="base"
              type="text"
              placeholder="Addresse email"
              sizing="md"
              name="email"
              value={user.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group mb-3">
            <div className="block flex justify-start mb-2">
              <Label
                htmlFor="base"
                className="text-sm text-center font-bold"
                value="Mot de passe*"
              />
            </div>
            <TextInput
              id="base"
              type="password"
              placeholder="*******"
              sizing="md"
              name="password"
              value={user.password}
              onChange={handleInput}
              required
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="bg-zinc-800  uppercase w-full hover:bg-gray-700 text-white font-bold px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Créer mon compte
          </Button>
          <div className="mt-6 text-zinc-900">
            <hr className="text-zinc-900 mt-4"></hr>
            <p className="mt-4">Vous avez déjà un compte ? </p>
            <Link to="/platform-react-cicd-challenge/login">
              <Button className="border-gray-700 mt-2 bg-zinc-100 text-zinc-900 uppercase w-full hover:bg-gray-700 font-bold px-4 rounded-lg focus:outline-none focus:shadow-outline">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
