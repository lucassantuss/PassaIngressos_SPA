import styles from "./PaginaPadrao.module.css"

import { Outlet } from "react-router-dom";

export default function PaginaPadrao() {
    return (
        <main>
            <Outlet />
        </main>
    )
}