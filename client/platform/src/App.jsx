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
import { PageEtablissement } from './pages/PageEtablissement';
import Reservation from './pages/Reservation';
import Login from './components/Login';
import Register from './components/Register';

const routes = [
  {
    path: '/',
    element: <PlatformLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'prestataire-register', element: <PrestataireRegister /> },
      { path: 'etablissement/:id', element: <PageEtablissement />}, // à supprimer
      { path: '/reservation', element: <Reservation /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ]
  },
  {
    path: '/backoffice',
    element: <BackOfficeLayout />,
    children: [
      { path: 'admin-panel', element: <AdminPanel /> },
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
          <RouterProvider router={router} />
        </LoadScript>
      </>

    );
}

export default App
