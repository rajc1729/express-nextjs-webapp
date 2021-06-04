import styles from "../../styles/components/button.module.scss";

export interface CustomButtonProps {
  children?: React.ReactNode;
  fill?: boolean;
  color?: string;
  onClick?: (event) => void;
  disabled?: boolean;
}

const CustomButton: React.SFC<CustomButtonProps> = ({
  children,
  fill,
  color,
  onClick,
  disabled,
}) => {
  return (
    <>
      {fill ? (
        color == "red" ? (
          <button
            className={styles.fill_button}
            style={
              !disabled
                ? { backgroundColor: "#F26358" }
                : { backgroundColor: "#F2635866" }
            }
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
        ) : (
          <button
            className={styles.fill_button}
            style={
              !disabled
                ? { backgroundColor: "#446BE5" }
                : { backgroundColor: "#446BE566" }
            }
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
        )
      ) : (
        <button
          className={styles.unfill_button}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  );
};

CustomButton.defaultProps = {
  fill: true,
  color: "blue",
  disabled: false,
};

export default CustomButton;
