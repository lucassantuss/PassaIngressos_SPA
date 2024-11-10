import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import api from "../services/api";

const PrivateRoutes = ({ role }) => {
  const [permissions, setPermissions] = useState(null);
  const navigate = useNavigate();
  const { userLogged } = useAuth();

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await api.get("/Acesso/ListarPerfis");
        const userRoles = response.data;

        const roleArray = role.split(",");
        const hasRole = userRoles.some(profile => roleArray.includes(profile.nomePerfil.toUpperCase()));
        setPermissions(hasRole);
      } catch (error) {
        console.error("Erro ao carregar roles:", error);
        setPermissions(false);
      }
    };

    if (userLogged()) {
      loadRoles();
    } else {
      navigate("/login");
    }
  }, [role, userLogged, navigate]);

  useEffect(() => {
    if (permissions === false) {
      navigate("/");
    }
  }, [permissions, navigate]);

  if (!userLogged() || permissions === null) {
    return null;
  }

  return permissions ? <Outlet /> : null;
};

export default PrivateRoutes;