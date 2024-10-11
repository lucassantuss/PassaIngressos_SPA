import { useEffect, useState } from "react";
import axios from "axios"; // TODO Remover depois
import CampoTitulo from "components/CampoTitulo";
import FeedbackCard from "components/FeedbackCard";

import styles from "./Feedback.module.css";

// TODO Remover depois
const api = axios.create({
  baseURL: "http://localhost:5026/",
});

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const listarFeedbacks = async () => {
      try {
        // const response = await api.get("/Listarfeedbacks");
        // setFeedbacks(response.data);
      } catch (error) {
        console.error("Erro ao listar feedbacks:", error);
      }
    };

    listarFeedbacks();
  }, []);

  return (
    <div className={styles.feedback}>
      <CampoTitulo titulo="Feedback dos Usuários" />

      <div className={styles.feedbackList}>
        {feedbacks.map((feedback, index) => (
          <FeedbackCard
            key={index}
            feedback={feedback.text}
            name={feedback.name}
            age={feedback.age}
            imgSrc={feedback.imgSrc}
          />
        ))}

        <FeedbackCard
          feedback="Muito bom, consegui vender meu ingresso!"
          name="Danilo"
          age={27}
          imgSrc="/images/groupMembers/danilo.jpg"
        />
        <FeedbackCard
          feedback="Top!! Comprei o ingresso pro show do The Weeknd e deu tudo certo!"
          name="Renan"
          age={22}
          imgSrc="/images/groupMembers/renan.jpg"
        />
        <FeedbackCard
          feedback="Fácil e seguro, nem precisei conversar com ninguém para vender meu ingresso"
          name="Lucas"
          age={22}
          imgSrc="/images/groupMembers/lucas.jpg"
        />
      </div>
    </div>
  );
}

export default Feedback;