import styles from "../styles/components/Loading.module.scss";

export interface LoadingProps {}

const Loading: React.SFC<LoadingProps> = () => {
  return (
    <div className={styles.spinner_container}>
      <svg className={styles.spinner}>
        <circle cx="25" cy="25" r="25">
          {" "}
        </circle>
      </svg>
    </div>
  );
};

export default Loading;
