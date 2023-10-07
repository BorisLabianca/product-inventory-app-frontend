import styles from "./Card.module.scss";

const Card = ({ children, cardClass }) => {
  return (
    <div className={`${styles.card} ${cardClass} ${styles.centerCard}`}>
      {children}
    </div>
  );
};

export default Card;
