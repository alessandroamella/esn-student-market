import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'blue' | 'purple' | 'orange' | 'green' | 'dark-blue';
  size?: 'small' | 'medium' | 'large';
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  color = 'blue',
  size = 'medium',
}) => {
  const colorClass = `bg-${color}-500 hover:bg-${color}-700`;
  const sizeClass =
    size === 'small'
      ? 'text-sm px-2 py-1'
      : size === 'large'
      ? 'text-lg px-4 py-2'
      : 'text-base px-3 py-1.5';

  return (
    <button
      className={`text-white font-bold rounded ${colorClass} ${sizeClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
