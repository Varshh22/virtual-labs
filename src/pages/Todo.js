import React from 'react';

const Todo = () => {
  const styles = {
    container: {
      backgroundColor: 'var(--background-color)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden', // Prevent scrolling
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'var(--text-primary)',
      marginBottom: '20px',
      textAlign: 'left',
    },
    board: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexGrow: 1,
    },
    column: {
      backgroundColor: 'var(--white)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      width: '300px', // ✅ Same size for both columns
      minHeight: '300px', // ✅ Keeps the height equal for both sections
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    item: {
      backgroundColor: 'var(--gray-light)', // ✅ Very light grey
      color: 'var(--text-primary)',
      padding: '10px',
      borderRadius: '10px',
      display: 'flex', // ✅ Aligns text & icon properly
      justifyContent: 'space-between', // ✅ Text on left, icon on right
      alignItems: 'center', // ✅ Keeps everything aligned
    },
    moveIcon: {
      fontSize: '16px',
      color: 'var(--secondary-color)',
      cursor: 'grab', // ✅ Indicates it's draggable
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>To-Do List</h1>
      <div style={styles.board}>
        <div style={styles.column}>
          <h2>To Do</h2>
          <div style={styles.item}>
            CRM <span style={styles.moveIcon}>≡</span>
          </div>
          <div style={styles.item}>
            Project Planning <span style={styles.moveIcon}>≡</span>
          </div>
          <div style={styles.item}>
            Stock Price Prediction <span style={styles.moveIcon}>≡</span>
          </div>
          <div style={styles.item}>
            Fake News Detection <span style={styles.moveIcon}>≡</span>
          </div>
          <div style={styles.item}>
            Detection of Fraudulent... <span style={styles.moveIcon}>≡</span>
          </div>
        </div>
        <div style={styles.column}>
          <h2>Done</h2>
          <div style={styles.item}>
            Detection of Fraudulent... <span style={styles.moveIcon}>≡</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
