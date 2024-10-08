import { BrowserRouter, Route, Routes } from "react-router-dom";

import Menu from "../components/Menu";
import PaginaPadrao from "../components/PaginaPadrao";
import Rodape from "../components/Rodape";

import Inicio from '../pages/Inicio';
import VenderIngresso from "pages/VenderIngresso";
import Eventos from "../pages/Eventos"
import Evento from "pages/Evento";
import ComoFunciona from "../pages/ComoFunciona"
import Sobre from '../pages/Sobre';
import Login from "../pages/Login"
import NaoEncontrada from "../pages/NaoEncontrada"

import PrivateRoutes from "./PrivateRoutes";
import { AuthProvider } from "context/AuthContext";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Menu />

        <Routes>
          <Route path="/" element={<PaginaPadrao />}>
            <Route index element={<Inicio />} />
            <Route path="vender-ingresso" element={<VenderIngresso />} />
            <Route path="eventos" element={<Eventos />} />
            <Route path="evento/:id" element={<Evento />} />
            <Route path="como-funciona" element={<ComoFunciona />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoutes role="ADMIN, USER" />}>
            <Route path="logout" element={<Login />} />
          </Route>

          <Route path="*" element={<NaoEncontrada />} />
        </Routes>

        <Rodape />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;