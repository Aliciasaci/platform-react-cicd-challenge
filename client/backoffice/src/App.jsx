import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutProvider } from './layout/context/layoutcontext.jsx';
import Layout from './layout/layout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import CrudUser from './pages/admin/CrudUser';
import CrudCategory from './pages/admin/CrudCategory';
import AdminEtablissement from './pages/admin/AdminEtablissement';
import DemandePrestataire from './pages/admin/DemandePrestataire';
import CrudEmploye from './pages/prestataire/CrudEmploye';
import CrudPrestation from './pages/prestataire/CrudPrestation';
import CrudEtablissement from './pages/prestataire/CrudEtablissement';

function App() {
    return (
        <>
            <Router>
                <LayoutProvider>
                    <Layout>
                        <Routes>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/users" element={<CrudUser />} />
                            <Route path="/admin/categories" element={<CrudCategory />} />
                            <Route path="/admin/etablissements" element={<AdminEtablissement />} />
                            <Route path="/admin/demandes" element={<DemandePrestataire />} />

                            <Route path="/prestataire/employes" element={<CrudEmploye />} />
                            <Route path="/prestataire/prestations" element={<CrudPrestation />} />
                            <Route path="/prestataire/etablissements" element={<CrudEtablissement />} />
                        </Routes>
                    </Layout>
                </LayoutProvider>
            </Router>
        </>
    );
}

export default App


