import React, { forwardRef } from 'react';
import { InputFieldStyle } from './InputStyled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', value, onChange, placeholder = '', id, label, name, ...rest }, ref) => {
    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <InputFieldStyle
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          {...rest} // permite passar qualquer outra prop padrão de <input>
        />
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
