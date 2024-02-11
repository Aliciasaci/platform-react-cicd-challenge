import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutProvider } from "./layout/context/LayoutContext.jsx";
import Layout from "./layout/layout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import CrudUser from "./pages/admin/CrudUser";
import CrudCategory from "./pages/admin/CrudCategory";
import AdminEtablissement from "./pages/admin/AdminEtablissement";
import DemandePrestataire from "./pages/admin/DemandePrestataire";
import CrudEmploye from "./pages/prestataire/CrudEmploye";
import CrudPrestation from "./pages/prestataire/CrudPrestation";
import CrudEtablissement from "./pages/prestataire/CrudEtablissement";
import LogIn from "./(full-page)/Login/LogIn.jsx"; // Ensure the casing matches the actual file path
import SimpleLayout from "./(full-page)/layout.jsx";
import RequireAuth from "./pages/auth/RequireAuth.jsx";

function App() {
  return (
    <>
      <Router>
        <LayoutProvider>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route
                path="/"
                element={
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <Layout>
                    <CrudUser />
                  </Layout>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <Layout>
                    <CrudCategory />
                  </Layout>
                }
              />
              <Route
                path="/admin/etablissements"
                element={
                  <Layout>
                    <AdminEtablissement />
                  </Layout>
                }
              />
              <Route
                path="/admin/demandes"
                element={
                  <Layout>
                    <DemandePrestataire />
                  </Layout>
                }
              />

              <Route
                path="/prestataire/employes"
                element={
                  <Layout>
                    <CrudEmploye />
                  </Layout>
                }
              />
              <Route
                path="/prestataire/prestations"
                element={
                  <Layout>
                    <CrudPrestation />
                  </Layout>
                }
              />
              <Route
                path="/prestataire/etablissements"
                element={
                  <Layout>
                    <CrudEtablissement />
                  </Layout>
                }
              />
            </Route>
            <Route
              path="/signin"
              element={
                <SimpleLayout>
                  <LogIn />
                </SimpleLayout>
              }
            />
          </Routes>
        </LayoutProvider>
      </Router>
    </>
  );
}

export default App;
