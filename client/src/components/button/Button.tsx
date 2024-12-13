import React from 'react';

interface ButtonProps {
  className: string;
  text: string | React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  text,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
