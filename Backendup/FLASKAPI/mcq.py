from flask import Flask, render_template, request, jsonify, session
import random
import os
from quiz_data import questions_data

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Required for using sessions

@app.route('/')
def index():
    """Render the main MCQ page"""
    return render_template('index.html')

@app.route('/get-questions')
def get_questions():
    """API endpoint to get 10 random questions"""
    # Randomly select 10 questions from the question bank
    selected_questions = random.sample(questions_data, 10)
    
    # Store the selected questions in the session for scoring later
    session['current_questions'] = selected_questions
    
    # Prepare the questions for the client by removing the correct answer
    client_questions = []
    for question in selected_questions:
        # Create a copy of the question without revealing the correct answer
        q_copy = {
            'question': question['question'],
            'options': question['options']
        }
        client_questions.append(q_copy)
    
    return jsonify(client_questions)

@app.route('/submit-answers', methods=['POST'])
def submit_answers():
    """API endpoint to handle answer submission and score calculation"""
    if not request.is_json:
        return jsonify({'error': 'Invalid request format'}), 400
    
    # Get selected answers from request
    selected_answers = request.json.get('answers', {})
    
    # Get the current questions from session
    current_questions = session.get('current_questions', [])
    
    if not current_questions:
        return jsonify({'error': 'No active quiz found'}), 400
    
    # Calculate score
    score = 0
    results = []
    
    for idx, question in enumerate(current_questions):
        # Convert string index to integer if needed
        q_idx = str(idx)  # The index from client might be a string
        selected_idx = int(selected_answers.get(q_idx, -1)) if q_idx in selected_answers else -1
        correct_idx = question['correctAnswer']
        
        is_correct = selected_idx == correct_idx
        if is_correct:
            score += 1
        
        # Add detailed result for this question
        results.append({
            'question': question['question'],
            'selectedAnswer': selected_idx,
            'correctAnswer': correct_idx,
            'isCorrect': is_correct
        })
    
    # Prepare the response
    response = {
        'score': score,
        'total': len(current_questions),
        'percentage': (score / len(current_questions)) * 100 if current_questions else 0,
        'results': results
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
