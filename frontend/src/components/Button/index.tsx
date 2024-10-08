import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = `px-8 py-3 font-semibold transition-colors rounded`;
  const variants = {
    primary: 'bg-esnblue hover:bg-esndarkblue text-white dark:text-gray-800',
    secondary:
      'bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-white',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
