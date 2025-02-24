import React from 'react';

const Button = ({ children, onClick, variant = 'primary', ...props }) => {
  const buttonStyles = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    width: props.fullWidth ? '100%' : 'auto',
    backgroundColor: variant === 'primary' ? 'var(--primary-color)' : 'var(--white)',
    color: variant === 'primary' ? 'var(--white)' : 'var(--primary-color)',
  };

  return (
    <button style={buttonStyles} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;