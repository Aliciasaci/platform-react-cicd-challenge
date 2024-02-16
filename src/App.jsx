import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import { LoadScript } from "@react-google-maps/api";
import PrestataireRegister from "./pages/PrestataireRegister";
import PlatformLayout from "./layouts/PlatformLayout";
import Home from "./pages/Home";
import { PageEtablissement } from "./pages/PageEtablissement";
import Reservation from "./pages/Reservation";
import Login from "./components/userprofil/Login";
import Register from "./components/userprofil/Register";
import UserProfile from "./pages/UserProfile";
import { AppProvider } from "./context";
import UserInformations from "./components/userprofil/UserInformations";
import resourcesLoaded from "./i18n";
import ContentLoader from "react-content-loader";
import React, { useState, useEffect } from "react";
import Prestation from "./pages/Prestation";
import CancelledReservations from "./components/userprofil/CancelledReservations";
import { EtablissementsList } from "./pages/EtablissementsList";
// import PrestatairePanel from './pages/PrestatairePanel';
// import CrudEmploye from './pages/CrudEmploye';

const routes = [
  {
    path: "/",
    element: <PlatformLayout />,
    children: [
      { path: "/platform-react-cicd-challenge", element: <Home /> },
      { path: "/platform-react-cicd-challenge/prestataire-register", element: <PrestataireRegister /> },
      { path: "/platform-react-cicd-challenge/etablissement/:id", element: <PageEtablissement /> }, // à supprimer
      { path: "/platform-react-cicd-challenge/reservation", element: <Reservation /> },
      { path: "/platform-react-cicd-challenge/login", element: <Login /> },
      { path: "/platform-react-cicd-challenge/register", element: <Register /> },
      { path: "/platform-react-cicd-challenge/user-profile", element: <UserProfile /> },
      { path: "/platform-react-cicd-challenge/mon-compte", element: <UserInformations /> },
      { path: "/platform-react-cicd-challenge/cancelled-reservations", element: <CancelledReservations /> },
      { path: "/platform-react-cicd-challenge/prestations/:id", element: <Prestation /> },
      { path: "/platform-react-cicd-challenge/etablissements", element: <EtablissementsList /> },
    ],
  },
];
  
const router = createHashRouter(routes);

function App() {
  const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resourcesLoaded.then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <ContentLoader
        speed={2}
        width={"100%"}
        height="100vh"
        backgroundColor="#c4c4c4"
        foregroundColor="#ececec"
      >
        <rect x="25%" y="300" rx="2" ry="2" width="800" height="100" />
        <rect x="0" y="0" rx="2" ry="2" width="100%" height="50" />
      </ContentLoader>
    );
  }

  return (
    <>
      <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </LoadScript>
    </>
  );
}

export default App;
