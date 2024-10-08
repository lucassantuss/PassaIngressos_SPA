import { Outlet } from "react-router-dom";

import styles from "./PaginaPadrao.module.css";

export default function PaginaPadrao() {
  return (
    <main>
      <Outlet />
    </main>
  );
}