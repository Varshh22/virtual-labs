import React from 'react';
import Card from '../common/Card';

const ExperimentVideo = ({ videoUrl, title }) => {
  const styles = {
    videoContainer: {
      position: 'relative',
      width: '100%',
      paddingTop: '56.25%', // 16:9 Aspect Ratio
      marginBottom: '20px',
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
    },
    controls: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px',
    },
    controlButton: {
      padding: '8px',
      backgroundColor: 'var(--gray-light)',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }
  };

  return (
    <Card>
      <div style={styles.videoContainer}>
        <video 
          style={styles.video}
          controls
          src={videoUrl}
          title={title}
        />
      </div>
      <div style={styles.controls}>
        <button style={styles.controlButton}>⏪ 10s</button>
        <button style={styles.controlButton}>⏩ 10s</button>
      </div>
    </Card>
  );
};

export default ExperimentVideo;