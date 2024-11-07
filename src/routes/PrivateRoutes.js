import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import api from "../services/api";

const PrivateRoutes = ({ role }) => {
  const [permissions, setPermissions] = useState(false);
  const navigate = useNavigate();
  const { userLogged } = useAuth();

  useEffect(() => {
    async function loadRoles() {
      try {
        const response = await api.get("/Acesso/ListarPerfis");
        const userRoles = response.data;
        
        const hasRole = role.split(",").some(r => userRoles.includes(r));
        setPermissions(hasRole);
      } catch (error) {
        console.error("Erro ao carregar roles:", error);
      }
    }

    if (userLogged()) {
      loadRoles();
    } else {
      navigate("/login");
    }
  }, [role, userLogged, navigate]);

  if (!userLogged()) {
    return null;
  }

  return permissions ? <Outlet /> : navigate("/");
};

export default PrivateRoutes;