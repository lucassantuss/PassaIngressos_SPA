import { useEffect, useState } from "react";
import CampoTitulo from "components/CampoTitulo";
import FeedbackCard from "components/FeedbackCard";
import api from "services/api";

import styles from "./Feedback.module.css";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const listarFeedbacks = async () => {
      try {
        // Lista os feedbacks
        const response = await api.get("/Feedback/ListarFeedbacks");
        const feedbacksData = response.data;

        // Chama o método para buscar as imagens
        const feedbacksComImagens = await Promise.all(
          feedbacksData.map(
            async (feedback) => {
              if (feedback.idArquivoFoto) {
                feedback.imagemPessoa = `${api.defaults.baseURL}Arquivo/PesquisarArquivoPorId/${feedback.idArquivoFoto}`;
              } else {
                feedback.imagemPessoa = '/images/User.png'; // Imagem padrão se não houver
              }
              return feedback;
            }));

        setFeedbacks(feedbacksComImagens);
      } catch (error) {
        console.error("Erro ao listar os feedbacks:", error);
      }
    };

    listarFeedbacks();
  }, []);

  return (
    <div className={styles.feedback}>
      <CampoTitulo titulo="Feedback dos Usuários" />

      <div className={styles.feedbackList}>
        {feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.idFeedback}
            feedback={feedback.descricaoFeedback}
            name={feedback.nomePessoa}
            age={feedback.idadePessoa}
            imgSrc={feedback.imagemPessoa}
          />
        ))}
      </div>
    </div>
  );
}

export default Feedback;