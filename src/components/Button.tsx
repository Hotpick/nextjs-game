import styles from "./Button.module.css";

const Button = () => {
  return (
    <button className={styles.root}>
      <span>Click me</span>
    </button>
  );
};

export default Button;
