import { useEffect, useState } from "react";
import axios from "axios"; // TODO Remover depois
import EventoDisponivelCard from "components/EventoDisponivelCard";

import styles from "./EventosDisponiveis.module.css";

// TODO Remover depois
const api = axios.create({
  baseURL: "http://localhost:5026/",
});

// const EventosDisponiveis = () => {
//   const eventosDisponiveis = [
//     {
//       title: "The Weeknd",
//       ingressos: 3,
//       ano: 2024,
//       image: "/images/events/The-Weeknd-2024.jpg",
//       reverse: true,
//     },
//     {
//       title: "Bruno Mars",
//       ingressos: 7,
//       ano: 2024,
//       image: "/images/events/Bruno-Mars-2024.png",
//       reverse: false,
//     },
//   ];

//   // const [eventosDisponiveis, setEventosDisponiveis] = useState([]);

//   useEffect(() => {
//     const listarEventosDisponiveis = async () => {
//       try {
//         // const response = await axios.get("/ListarEventosDisponiveis");
//         // setEventosDisponiveis(response.data);
//       } catch (error) {
//         console.error("Erro ao listar eventos disponíveis:", error);
//       }
//     };

//     listarEventosDisponiveis();
//   }, []);

//   return (
//     <div>
//       {eventosDisponiveis.map((evento, index) => (
//         <EventoDisponivelCard key={index} evento={evento} />
//       ))}
//     </div>
//   );
// };

const EventosDisponiveis = ({ eventosFiltrados }) => {
  return (
    <div>
      {eventosFiltrados.map((evento, index) => (
        <EventoDisponivelCard key={index} evento={evento} />
      ))}
    </div>
  );
};

export default EventosDisponiveis;