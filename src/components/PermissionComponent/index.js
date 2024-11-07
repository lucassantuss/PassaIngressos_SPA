import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";

const PermissionComponent = ({ role, children }) => {
  const [permissions, setPermissions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function loadRoles() {
      const response = await api.get("/Acesso/ListarPerfis");
      const findRole = response.data.some((r) => role?.split(",").includes(r));

      setPermissions(findRole);
    }

    loadRoles();
  }, [location]);

  return <>{permissions && children}</>;
};

export default PermissionComponent;