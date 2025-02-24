import React, { useState } from 'react';
import Card from '../components/common/Card';

const MCQPage = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      marginBottom: '32px',
    },
    question: {
      marginBottom: '24px',
    },
    options: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid var(--gray-light)',
      cursor: 'pointer',
    },
    selected: {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--white)',
      border: 'none',
    },
  };

  const questions = Array(10).fill({
    question: 'A Program Reads In 500 Integers In The Range [0..100]Representing The Scores Of 500 Students.It Then Prints The Frequency Of Each Score Above 50.What Would Be The Best Way For The Program To Store The Frequencies?',
    options: [
      'An Array Of 101 Numbers',
      'An Array Of 50 Numbers',
      'An Array Of 500 Numbers',
      'An Array Of 200 Numbers',
    ],
  });

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Multi Choice Questions</h1>
      </div>

      {questions.map((question, questionIndex) => (
        <Card key={questionIndex} style={styles.question}>
          <p style={{ marginBottom: '16px' }}>
            {questionIndex + 1}. {question.question}
          </p>
          <div style={styles.options}>
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                style={{
                  ...styles.option,
                  ...(selectedAnswers[questionIndex] === optionIndex ? styles.selected : {}),
                }}
                onClick={() => handleOptionSelect(questionIndex, optionIndex)}
              >
                <input
                  type="radio"
                  checked={selectedAnswers[questionIndex] === optionIndex}
                  onChange={() => {}}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MCQPage;