import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './App.css'
import { LoadScript } from '@react-google-maps/api';
import PrestataireRegister from './components/PrestataireRegister'
import PlatformLayout from './layouts/PlatformLayout';
import BackOfficeLayout from './layouts/BackofficeLayout';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import CrudUser from './pages/CrudUser';
import CrudCategory from './pages/CrudCategory';
import CrudEtablissement from './pages/CrudEtablissement';
import { PageEtablissement } from './pages/PageEtablissement';
import Reservation from './pages/Reservation';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from "./pages/UserProfile";
import { AppProvider } from './context';
import UserInformations from './components/UserInformations';
<<<<<<< HEAD
=======
import PrestatairePanel from './pages/PrestatairePanel';
import CrudEmploye from './pages/CrudEmploye';

>>>>>>> dev
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
    ]
  },
  {
    path: '/backoffice/admin',
    element: <BackOfficeLayout />,
    children: [
      { path: 'admin-panel', element: <AdminPanel /> },
      { path: 'users', element: <CrudUser /> },
      { path: 'categories', element: <CrudCategory /> },
      { path: 'etablissements', element: <CrudEtablissement /> }
    ]
  },
<<<<<<< HEAD
]
=======
  {
    path: '/backoffice/prestataire',
    element: <BackOfficeLayout />,
    children: [
      { path: 'prestataire-panel', element: <PrestatairePanel /> },
      { path: 'employes', element: <CrudEmploye /> },
    ]
  }
]     
>>>>>>> dev

const router = createBrowserRouter(
  routes
)

function App() {

  const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

<<<<<<< HEAD
  return (
    <>
      <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </LoadScript>
    </>

  );
=======
    return (
      <>
          <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
            <RouterProvider router={router} />
          </LoadScript>
      </>
    );
>>>>>>> dev
}

export default App
