import styles from './Input.module.scss';

type InputProps = {
  type: string;
  placeholder?: string;
  className?: string;
  onChange?: any;
  name?: string;
  label?: string;
}

const Input = ({...props}:InputProps) => {
  return (
    <div className={styles.InputWrap}>
      <div className={styles.InputLabel}>{props.label}</div>
      <input className={`${props.className} ${styles.InputField}`}  {...props} />
    </div>
  )
}

export default Input