import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const PrivateRoutes = ({ role }) => {
  const [permissions, setPermissions] = useState(false);
  const navigate = useNavigate();
  
  const { userLogged } = useAuth();

  useEffect(() => {
    async function loadRoles() {
      const response = await api.get("/Acesso/Perfis");

      const findRole = response.data.some((r) =>
        role?.split(",").includes(r)
      );

      setPermissions(findRole);
    }

    if (userLogged()) {
      loadRoles();
    } else {
      navigate("/");
    }
  }, [role, userLogged, navigate]);

  if (!userLogged()) {
    navigate("/");
    return null;
  }

  if (!role && userLogged()) {
    return <Outlet />;
  }

  return permissions ? <Outlet /> : navigate("/");
};

export default PrivateRoutes;