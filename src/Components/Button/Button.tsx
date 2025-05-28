import React from 'react';
import { ButtonField } from './ButtonStyled';

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <ButtonField onClick={onClick}>
      {text}
    </ButtonField>
  );
};

export default Button;
