import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExperimentCard from '../components/experiments/ExperimentCard';
import { EXPERIMENTS } from '../utils/constants';

const ExperimentList = () => {
  const navigate = useNavigate();
  
  const styles = {
    container: {
      padding: '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
    },
    searchContainer: {
      position: 'relative',
      width: '300px',
    },
    searchInput: {
      width: '100%',
      padding: '12px',
      paddingLeft: '40px',
      borderRadius: '8px',
      border: '1px solid var(--gray-light)',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>My Experiments</h1>
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search anything" 
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.grid}>
        {EXPERIMENTS.map((experiment) => (
          <div 
            key={experiment.id}
            onClick={() => navigate(`/experiments/${experiment.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <ExperimentCard {...experiment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperimentList;
