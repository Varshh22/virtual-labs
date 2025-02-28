import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import MainLayout from '../components/layout/MainLayout';

const MCQPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch questions when component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/get-questions');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError('Error loading questions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/submit-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: selectedAnswers }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answers');
      }

      const results = await response.json();
      setResults(results);
      setQuizSubmitted(true);
    } catch (err) {
      setError('Error submitting answers. Please try again.');
      console.error(err);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setResults(null);
    fetchQuestions();
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      marginBottom: '32px',
      textAlign: 'center',
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
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '32px',
    },
    resultCard: {
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '24px',
      textAlign: 'center',
    },
    correct: {
      backgroundColor: '#e6f7e6',
      borderLeft: '4px solid #2e8b57',
    },
    incorrect: {
      backgroundColor: '#ffebee',
      borderLeft: '4px solid #d32f2f',
    },
    resultQuestion: {
      marginBottom: '16px',
      padding: '16px',
      borderRadius: '8px',
    },
    loader: {
      textAlign: 'center',
      padding: '40px',
    }
  };

  // Main content to render based on state
  const renderContent = () => {
    // Show loading state
    if (isLoading) {
      return (
        <div style={styles.loader}>
          <h2>Loading questions...</h2>
        </div>
      );
    }

    // Show error message
    if (error) {
      return (
        <div>
          <div style={styles.header}>
            <h1>Quiz Error</h1>
          </div>
          <Card>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>{error}</p>
              <Button onClick={fetchQuestions}>Try Again</Button>
            </div>
          </Card>
        </div>
      );
    }

    // Show results after submission
    if (quizSubmitted && results) {
      return (
        <div>
          <div style={styles.header}>
            <h1>Quiz Results</h1>
          </div>
          
          <Card style={styles.resultCard}>
            <h2>Your Score: {results.score} / {results.total}</h2>
            <h3>{results.percentage.toFixed(1)}%</h3>
          </Card>

          <h2>Detailed Results</h2>
          {results.results.map((result, index) => (
            <Card 
              key={index} 
              style={{
                ...styles.resultQuestion,
                ...(result.isCorrect ? styles.correct : styles.incorrect)
              }}
            >
              <p><strong>Question {index + 1}:</strong> {result.question}</p>
              <p>
                <strong>Your Answer:</strong> {
                  result.selectedAnswer >= 0 ? 
                  questions[index].options[result.selectedAnswer] : 
                  'Not answered'
                }
              </p>
              <p>
                <strong>Correct Answer:</strong> {
                  questions[index].options[result.correctAnswer]
                }
              </p>
            </Card>
          ))}

          <div style={styles.buttonContainer}>
            <Button onClick={resetQuiz}>Take Another Quiz</Button>
          </div>
        </div>
      );
    }

    // Show quiz questions
    return (
      <div>
        <div style={styles.header}>
          <h1>Chemistry Knowledge Quiz</h1>
          <p>Select the best answer for each question</p>
        </div>

        {questions.map((question, questionIndex) => (
          <Card key={questionIndex} style={styles.question}>
            <p style={{ marginBottom: '16px', fontWeight: '500' }}>
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

        <div style={styles.buttonContainer}>
          <Button 
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length === 0}
          >
            Submit Answers
          </Button>
        </div>
      </div>
    );
  };

  // Wrap content in your layout
  return (
    <MainLayout>
      <div style={styles.container}>
        {renderContent()}
      </div>
    </MainLayout>
  );
};

export default MCQPage;