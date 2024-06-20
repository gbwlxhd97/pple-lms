import CloseIcon from '@/icons/icon/CloseIcon';
import SingleCheckBox from '../SingleCheckBox'
import styles from './index.module.scss'
const OptionInput = () => {
  return (
    <div className={styles.Wrap}>
      <SingleCheckBox checkBoxType="Default" />
      <input placeholder="옵션1" className={styles.Input} />
      <CloseIcon width={18} height={18} />
    </div>
  );
}

export default OptionInput