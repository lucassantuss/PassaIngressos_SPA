import FeedbackCard from 'components/FeedbackCard';
import styles from './Feedback.module.css';

function Feedback() {
  return (
    <div className={styles.feedback}>
      <h2>Feedback dos Usuários</h2>

      <div className={styles.feedbackList}>
        <FeedbackCard
          feedback="Muito bom, consegui vender meu ingresso!"
          name="Danilo"
          age={27}
          imgSrc='/images/groupMembers/danilo.jpg'
        />
        <FeedbackCard
          feedback="Top!! Comprei o ingresso pro show do The Weeknd e deu tudo certo!"
          name="Renan"
          age={22}
          imgSrc='/images/groupMembers/renan.jpg'
        />
        <FeedbackCard
          feedback="Fácil e seguro, nem precisei conversar com ninguém para vender meu ingresso"
          name="Lucas"
          age={22}
          imgSrc='/images/groupMembers/lucas.jpg'
        />
      </div>
    </div>
  );
}

export default Feedback;