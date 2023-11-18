from transformers import DistilBertTokenizer, DistilBertForQuestionAnswering
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS module

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in the app

tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased', return_token_type_ids=True)
model = DistilBertForQuestionAnswering.from_pretrained('distilbert-base-uncased-distilled-squad')

context = """
Welcome to the Office of the Chief Operating Officer (COE) of XYZ University. Our goal is to ensure smooth operations and provide assistance to students regarding various aspects of academic and administrative processes. Below is an overview of some key instructions, rules, and processes managed by the COE:

1. **Admission Process:**
   The admission process at XYZ University involves meeting specific requirements outlined in the admission guidelines. This includes submitting necessary documents and completing the application form.

2. **Course Registration:**
   XYZ University provides a diverse range of courses. Detailed information about each course, including prerequisites, is available in the course catalog. Students should review this information before registering for courses.

If you have any queries or need assistance with any of the above aspects, feel free to ask. We are here to support your academic journey and ensure a positive and enriching experience at XYZ University.
"""

@app.route('/distilbert', methods=['POST'])
def distilbert():
    data = request.get_json()
    question = data['question']
    print(f"Received input: {question}")

    inputs = tokenizer(question, context, return_tensors='pt')
    outputs = model(**inputs)

    answer_start = torch.argmax(outputs.start_logits)
    answer_end = torch.argmax(outputs.end_logits) + 1

    answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(inputs['input_ids'][0][answer_start:answer_end]))
    print(f"Generated output: {answer}")
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(port=3003, debug=True)
