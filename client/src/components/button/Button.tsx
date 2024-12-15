import React from 'react';

interface ButtonProps {
  className: string;
  text: string | React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  onClick?: () => void;
}

export const Button = ({
  className,
  text,
  disabled = false,
  type = 'button',
  name,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      name={name}
    >
      {text}
    </button>
  );
};
