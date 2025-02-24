import React from 'react';
import Sidebar from '../components/layout/Sidebar'; // Correct import path

const SettingsPage = () => {
  const styles = {
    container: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'white',
    },
    content: {
      flex: 1,
      padding: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar /> {/* Sidebar stays visible */}
      <div style={styles.content}>
        <h1>Settings</h1>
        <p>Modify your preferences here.</p>
      </div>
    </div>
  );
};

export default SettingsPage;
