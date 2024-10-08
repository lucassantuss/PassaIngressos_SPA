import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Botao from "components/Botao";

import styles from "./Evento.module.css";

const eventos = {
  1: {
    title: "The Weeknd",
    locais: [
      "Estádio Morumbis (São Paulo - Brasil)",
      "Allianz Parque (São Paulo - Brasil)",
    ],
    datas: ["07/09/2024 - 21h", "08/09/2024 - 21h"],
    tiposIngresso: ["Arquibancada (Meia-Entrada)", "Pista (Inteira)"],
    valores: ["R$ 240,00", "R$ 480,00"],
    imageUrl: "/images/events/The-Weeknd-2024.jpg",
  },
};

export default function Evento() {
    const { id } = useParams(); // Pega o ID da URL
    const [eventoAtual, setEventoAtual] = useState(null);
  
    // Simulação de fetch de dados do evento
    useEffect(() => {
      const evento = eventos[id];
      if (evento) {
        setEventoAtual(evento);
      }
    }, [id]);
  
    if (!eventoAtual) {
      return <h1>Carregando evento...</h1>;
    }
  
    return (
      <div className={styles.eventoContainer}>
        <div className={styles.imagemEventoContainer}>
          <img
            src={eventoAtual.imageUrl}
            alt={eventoAtual.title}
            className={styles.imagemEvento}
          />
        </div>
  
        <div className={styles.infoEventoContainer}>
          <h1 className={styles.tituloEvento}>{eventoAtual.title}</h1>
  
          <div className={styles.detalhesEvento}>
            <div className={styles.linhaEvento}>
              <label>Local:</label>
              <select className={styles.campoSelect}>
                {eventoAtual.locais.map((local, index) => (
                  <option key={index} value={local}>
                    {local}
                  </option>
                ))}
              </select>
            </div>
  
            <div className={styles.linhaEvento}>
              <label>Data:</label>
              <select className={styles.campoSelect}>
                {eventoAtual.datas.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
  
            <div className={styles.linhaEvento}>
              <label>Tipo Ingresso:</label>
              <select className={styles.campoSelect}>
                {eventoAtual.tiposIngresso.map((tipo, index) => (
                  <option key={index} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
  
            <div className={styles.linhaEvento}>
              <label>Valor:</label>
              <select className={styles.campoSelect}>
                {eventoAtual.valores.map((valor, index) => (
                  <option key={index} value={valor}>
                    {valor}
                  </option>
                ))}
              </select>
            </div>
  
            <Botao cn={styles.botaoAdicionar} conteudo="Adicionar no carrinho" />
          </div>
        </div>
      </div>
  );
}