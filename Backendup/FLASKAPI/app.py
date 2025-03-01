import torch
import nltk
from flask import Flask, jsonify, request
from flask_cors import CORS
from newspaper import Article
from transformers import T5ForConditionalGeneration, T5Tokenizer

# Download NLTK tokenizer
nltk.download('punkt')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow cross-origin requests

# Load Pretrained Model
MODEL_NAME = "mrm8488/t5-base-finetuned-question-generation-ap"
tokenizer = T5Tokenizer.from_pretrained(MODEL_NAME)
model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME)

# Default Wikipedia URL for extracting text
PREDEFINED_URL = "https://en.wikipedia.org/wiki/Photosynthesis"

def extract_text_from_url(url):
    """Extract text from a given URL using Newspaper3k."""
    try:
        article = Article(url)
        article.download()
        article.parse()
        return article.text.strip() if article.text else None
    except Exception as e:
        print(f"⚠️ Error extracting text: {e}")
        return None

def generate_mcqs(text, num_questions=5):
    """Generate MCQs using T5 model."""
    if not text or not text.strip():
        return []

    # Limit text size to avoid excessive generation
    inputs = f"generate questions: {text[:1000]}"
    input_ids = tokenizer.encode(inputs, return_tensors="pt")

    outputs = model.generate(input_ids, max_length=256, num_return_sequences=num_questions, do_sample=True)
    questions = [tokenizer.decode(output, skip_special_tokens=True) for output in outputs]

    mcqs = []
    for q in questions:
        options = ["A) Photosynthesis", "B) Oxygen", "C) Carbon Dioxide", "D) Sunlight"]
        correct_answer = options[0]  # Dummy answer (Improve with NLP parsing)
        mcqs.append({"question": q, "options": options, "correct": correct_answer})

    return mcqs

@app.route('/generate_mcqs', methods=['GET'])
def generate_mcqs_api():
    """API endpoint to generate MCQs."""
    print("🔹 Received request for MCQs")  # Debug log

    text = extract_text_from_url(PREDEFINED_URL)
    if not text:
        print("❌ Error: No valid text available")
        return jsonify({"error": "No valid text available."}), 400

    mcqs = generate_mcqs(text)
    
    print(f"✅ Generated {len(mcqs)} MCQs")
    return jsonify({"mcqs": mcqs if mcqs else []})

@app.route('/submit_answers', methods=['POST'])
def submit_answers():
    """Evaluate user's answers."""
    data = request.json
    user_answers = data.get("answers", {})

    if not user_answers:
        return jsonify({"error": "No answers provided."}), 400

    correct_answers = {q["question"]: q["correct"] for q in generate_mcqs(extract_text_from_url(PREDEFINED_URL))}
    score = sum(1 for q, ans in user_answers.items() if ans == correct_answers.get(q, ""))

    return jsonify({"score": score, "total": len(correct_answers)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
