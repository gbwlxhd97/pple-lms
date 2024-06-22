import CloseIcon from '@/icons/icon/CloseIcon';
import SingleCheckBox from '../SingleCheckBox'
import styles from './index.module.scss'

type OptionInputProps = {
  placeholder: string;
  onClickDelete: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
};

const OptionInput = ({
  placeholder,
  onClickDelete,
  onChange,
  name,
  value,
}: OptionInputProps) => {
  return (
    <div className={styles.Wrap}>
      <SingleCheckBox checkBoxType="Default" />
      <input
        placeholder={placeholder}
        className={styles.Input}
        onChange={onChange}
        name={name}
        value={value}
      />
      <CloseIcon
        width={18}
        height={18}
        className={styles.CloseIcon}
        onClick={onClickDelete}
      />
    </div>
  );
};

export default OptionInput