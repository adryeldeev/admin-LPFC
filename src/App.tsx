import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import Login from "./Pages/Login/Login";
import CadastrarUser from "./Pages/CadastrarUser/CadastrarUser";
import { RequestPasswordReset } from "./Pages/RequestPassword/RequestPassword";
import { ResetPassword } from "./Pages/resetPassword/resetPassword";
import { LayoutAdmin } from "./Layout/LayoutAdmin";
import CadastrarVendedor from "./Pages/CadastrarVendedor/CadastrarVendedor";
import CadastrarVeiculos from "./Pages/CadastrarVeiculos/CadastrarVeiculos";
import Carros from "./Pages/Carros/Carros";
import Vendedores from "./Pages/Vendedores/Vendedores";
import Marcas from "./Pages/Marcas/Marcas.";
import CadastrarAdmin from "./Pages/CadastrarAdmin/CadastrarAdmin";
import CadastrarMarcas from "./Pages/CadastrarMarcas/CadastrarMarcas";
import PrivateRouteAdmin from "./Routes/PrivateRoute";



const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
   

    <Route path="/login" element={<Login />} />
          <Route path="/cadastrarUser" element={<CadastrarUser />} />
          <Route path="/forgot-password" element={<RequestPasswordReset />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Layout admin - Navbar admin */}
          <Route element={<PrivateRouteAdmin />}>
            <Route element={<LayoutAdmin />}>
              <Route path="/cadastrarVendedor" element={<CadastrarVendedor />} />
              <Route path="/cadastrarVeiculo" element={<CadastrarVeiculos />} />
              <Route path="/" element={<Carros />} />
              <Route path="/vendedores" element={<Vendedores />} />
              <Route path="/marcas" element={<Marcas />} />
              <Route path="/cadastrarAdmin" element={<CadastrarAdmin />} />
              <Route path="/cadastrarMarca" element={<CadastrarMarcas />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
