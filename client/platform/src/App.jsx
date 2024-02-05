import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './App.css'
import { LoadScript } from '@react-google-maps/api';
import PrestataireRegister from './components/PrestataireRegister'
import PlatformLayout from './layouts/PlatformLayout';
import Home from './pages/Home';
import { PageEtablissement } from './pages/PageEtablissement';
import Reservation from './pages/Reservation';
import Login from './components/userprofil/Login';
import Register from './components/userprofil/Register';
import UserProfile from "./pages/UserProfile";
import { AppProvider } from './context';
import UserInformations from './components/userprofil/UserInformations';
import Prestation from './pages/Prestation';
import CancelledReservations from './components/userprofil/CancelledReservations';
// import PrestatairePanel from './pages/PrestatairePanel';
// import CrudEmploye from './pages/CrudEmploye';

const routes = [
  {
    path: '/',
    element: <PlatformLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'prestataire-register', element: <PrestataireRegister /> },
      { path: 'etablissement/:id', element: <PageEtablissement /> }, // à supprimer
      { path: '/reservation', element: <Reservation /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/user-profile', element: <UserProfile /> },
      { path: '/mon-compte', element: <UserInformations /> },
      { path: '/cancelled-reservations', element: <CancelledReservations /> },
      { path: 'prestations/:id', element: <Prestation /> },
    ]
  },
]     

const router = createBrowserRouter(
  routes
)

function App() {

  const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

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

export default App
