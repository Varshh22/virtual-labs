import React from 'react';

const DashboardPage = () => {
  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      backgroundColor: 'white',
      padding: '20px', // ✅ Add padding for proper text alignment
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    description: {
      fontSize: '18px',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.description}>Welcome to your dashboard! View your stats and progress here.</p>
    </div>
  );
};

export default DashboardPage;
