import React from 'react';

const Card = ({ children, ...props }) => {
  const styles = {
    card: {
      backgroundColor: 'var(--white)',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      ...props.style,
    },
  };

  return (
    <div style={styles.card}>
      {children}
    </div>
  );
};

export default Card;