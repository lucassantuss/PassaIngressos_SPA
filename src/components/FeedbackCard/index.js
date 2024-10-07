import styles from './FeedbackCard.module.css';

function FeedbackCard({ feedback, name, age, imgSrc }) {
  return (
    <div className={styles.feedbackCard}>
      <p>{feedback}</p>
      <div className={styles.userDetails}>
        <img src={imgSrc} alt={name} className={styles.userImage} />
        <div>
          <span className={styles.userName}>{name}</span>
          <br/>
          <span className={styles.userAge}>{age} anos</span>
        </div>
      </div>
    </div>
  );
}

export default FeedbackCard;