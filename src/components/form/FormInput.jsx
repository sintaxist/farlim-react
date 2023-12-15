import { useState } from "react";

import styles from '../../styles/form.module.scss';

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, id, ...inputProps } = props;
  
    const handleFocus = (e) => {
      setFocused(true);
    };
  
    return (
      <li className={styles.formInput}>
        <input
            id={inputProps.name}
            {...inputProps}
            onBlur={handleFocus}
            focused={focused.toString()}
        />
        <label className={`${styles.entry__label} ${styles.labelInput}`} htmlFor={inputProps.name}>{label}</label>
        <span>{errorMessage}</span>
      </li>
    );
};
  
export default FormInput;