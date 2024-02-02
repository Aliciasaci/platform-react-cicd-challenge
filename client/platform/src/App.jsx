import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './App.css'
import { LoadScript } from '@react-google-maps/api';
import PrestataireRegister from './pages/PrestataireRegister'
import PlatformLayout from './layouts/PlatformLayout';
import Home from './pages/Home';
<<<<<<< HEAD
import AdminPanel from './pages/AdminPanel';
=======
>>>>>>> dc6a5785fe3a0b13b84081d3aa17aaa73b3fbed3
import { PageEtablissement } from './pages/PageEtablissement';
import Reservation from './pages/Reservation';
import Login from './components/Login';
import Register from './components/Register';
<<<<<<< HEAD
=======
import UserProfile from "./pages/UserProfile";
import { AppProvider } from './context';
import UserInformations from './components/UserInformations';
>>>>>>> dc6a5785fe3a0b13b84081d3aa17aaa73b3fbed3

const routes = [
  {
    path: '/',
    element: <PlatformLayout />,
    children: [
      { path: '/', element: <Home /> },
<<<<<<< HEAD
      // { path: 'prestataire-register', element: <PrestataireRegister /> },
      { path: 'etablissement/:id', element: <PageEtablissement />}, // à supprimer
=======
      { path: 'prestataire-register', element: <PrestataireRegister /> },
      { path: 'etablissement/:id', element: <PageEtablissement /> }, // à supprimer
>>>>>>> dc6a5785fe3a0b13b84081d3aa17aaa73b3fbed3
      { path: '/reservation', element: <Reservation /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ]
  },
<<<<<<< HEAD
  {
    path: '/prestataire',
    children: [
      { path: 'register', element: <PrestataireRegister /> },
    ]
  },
  {
    path: '/backoffice',
    element: <BackOfficeLayout />,
    children: [
      { path: 'admin-panel', element: <AdminPanel /> },
    ]
  },
=======
>>>>>>> dc6a5785fe3a0b13b84081d3aa17aaa73b3fbed3
]     

const router = createBrowserRouter(
  routes
)

function App() {

  const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

<<<<<<< HEAD
    return (
      <>
        <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
          <RouterProvider router={router} />
        </LoadScript>
      </>

    );
=======
  return (
    <>
      <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </LoadScript>
    </>

  );
>>>>>>> dc6a5785fe3a0b13b84081d3aa17aaa73b3fbed3
}

export default App
