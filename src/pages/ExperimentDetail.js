import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import ExperimentVideo from '../components/experiments/ExperimentVideo';
import Button from '../components/common/Button';

const ExperimentDetail = () => {
  const { id } = useParams();

  const styles = {
    container: {
      maxWidth: '100%', // ✅ Takes full width
      margin: '0 auto',
      paddingBottom: '80px', // ✅ Prevents floating buttons from covering content
    },
    header: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
    },
    title: {
      fontSize: '24px',
      textAlign: 'left',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    },
    videoContainer: {
      width: '90vw', // ✅ Makes video occupy most of the screen width
      maxWidth: '1200px',
    },
    section: {
      width: '90vw', // ✅ Makes procedure text occupy most of the screen width
      maxWidth: '1200px',
    },
    sectionTitle: {
      fontSize: '18px',
      marginBottom: '16px',
      textAlign: 'left',
    },
    floatingButtons: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      display: 'flex',
      gap: '12px',
    },
    chatbotButton: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      zIndex: 1000, // ✅ Ensures it stays on top
    },
    chatbotImage: {
      width: '50px',
      height: '50px',
    },
  };

  return (
    <div style={styles.container}>
      {/* ✅ Header with Floating Chatbot Button */}
      <div style={styles.header}>
        <h1 style={styles.title}>Estimation of Ferrous Sulphate (Fe2+)</h1>
        <button style={styles.chatbotButton}>
          <img src="/assets/chatbot.png" alt="Chatbot" style={styles.chatbotImage} />
        </button>
      </div>

      <div style={styles.content}>
        {/* ✅ Enlarged Video Section */}
        <div style={styles.videoContainer}>
          <ExperimentVideo videoUrl="/placeholder-video.mp4" title="Experiment 1 Video" />
        </div>

        {/* ✅ Procedure Section Below Video */}
        <Card style={styles.section}>
          <h2 style={styles.sectionTitle}>Procedure</h2>
          <p>Detailed procedure steps will go here...</p>
        </Card>
      </div>

      {/* ✅ Floating Bottom Buttons */}
      <div style={styles.floatingButtons}>
        <Button>Practice MCQs</Button>
        <Button>Practice Space</Button>
      </div>
    </div>
  );
};

export default ExperimentDetail;
