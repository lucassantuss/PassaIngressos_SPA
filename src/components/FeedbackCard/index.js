import styles from "./FeedbackCard.module.css";

function FeedbackCard({ feedback, name, age, imgSrc }) {
  return (
    <div className={styles.cardFeedbackContainer}>
      <p>{feedback}</p>
      <div className={styles.userDetailsCardFeedback}>
      <img src={imgSrc} alt={name} className={styles.userImageCardFeedback} />
        <div>
          <span className={styles.userNameCardFeedback}>{name}</span>
          <br />
          <span className={styles.userAgeCardFeedback}>{age} anos</span>
        </div>
      </div>
    </div>
  );
}

export default FeedbackCard;