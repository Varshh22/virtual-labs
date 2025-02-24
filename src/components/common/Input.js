import React from 'react';

const Input = ({ label, type = 'text', ...props }) => {
  const styles = {
    container: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      color: 'var(--secondary-color)',
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid var(--gray-light)',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}
      <input type={type} style={styles.input} {...props} />
    </div>
  );
};

export default Input;