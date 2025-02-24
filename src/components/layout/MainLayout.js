import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  const styles = {
    layout: {
      display: 'flex',
    },
    main: {
      marginLeft: '250px',
      padding: '24px',
      width: 'calc(100% - 250px)',
    },
  };

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;