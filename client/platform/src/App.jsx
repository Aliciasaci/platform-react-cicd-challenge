import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './App.css'
import PrestataireRegister from './components/PrestataireRegister'
import PlatformLayout from './layouts/PlatformLayout';
import BackOfficeLayout from './layouts/BackofficeLayout';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import { PagePrestataire } from './pages/PagePrestataire';

const routes = [
  {
    path: '/',
    element: <PlatformLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'prestataire-register', element: <PrestataireRegister /> },
      { path: 'page-presta-dev', element: <PagePrestataire />} // à supprimer
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
  return (
    <RouterProvider router={router} />
  )
}

export default App
