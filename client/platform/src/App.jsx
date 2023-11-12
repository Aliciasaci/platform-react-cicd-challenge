import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import './App.css'
import PrestataireRegister from './components/PrestataireRegister'
import PlatformLayout from './layouts/PlatformLayout';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PlatformLayout />}>
      <Route index element={<Home />} />
      <Route path="admin-panel" element={<AdminPanel />} />
      <Route path="prestataire-register" element={<PrestataireRegister />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
