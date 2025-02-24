import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import ExperimentVideo from '../components/experiments/ExperimentVideo';
import Button from '../components/common/Button';

const ExperimentDetail = () => {
  const { id } = useParams();

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '32px',
    },
    title: {
      fontSize: '24px',
      marginBottom: '16px',
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px',
    },
    section: {
      marginBottom: '24px',
    },
    sectionTitle: {
      fontSize: '18px',
      marginBottom: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Estimation of Ferrous Sulphate (Fe2+)</h1>
        <div>Titration • 1 week</div>
      </div>

      <div style={styles.content}>
        <div>
          <ExperimentVideo 
            videoUrl="/placeholder-video.mp4"
            title="Experiment 1 Video"
          />
          
          <Card style={styles.section}>
            <h2 style={styles.sectionTitle}>Objective</h2>
            <p>To observe the effect of heating on a copper sulfate (CuSO4) solution and understand how crystallization occurs when the solution cools.</p>
          </Card>

          <Card style={styles.section}>
            <h2 style={styles.sectionTitle}>Procedure</h2>
            <p>Detailed procedure steps will go here...</p>
          </Card>
        </div>

        <div>
          <Card>
            <h2 style={styles.sectionTitle}>Progress</h2>
            <div style={{ marginBottom: '20px' }}>
              <div>80% Complete</div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'var(--gray-light)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: '80%',
                  height: '100%',
                  backgroundColor: 'var(--primary-color)',
                }}/>
              </div>
            </div>
            <Button fullWidth>Practice MCQs</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExperimentDetail;
