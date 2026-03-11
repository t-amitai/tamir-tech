from flask import Flask, send_from_directory, request, abort, jsonify
import yagmail
from werkzeug.security import check_password_hash
from cryptography.fernet import Fernet
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__, static_url_path='', static_folder='./../client/dist')
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024  # 1MB

limiter = Limiter(get_remote_address, app=app)


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.post('/resume')
@limiter.limit("5 per minute")
def resume():
    body = request.get_json(silent=True)
    if not body or 'password' not in body:
        return jsonify(error="Missing password"), 400
    if check_password_hash(os.getenv('RESUME_PASSWORD_HASH'), body['password']):
        key = os.getenv('RESUME_KEY')
        cipher = Fernet(key.encode())
        resumePath = os.getcwd() + '/server/assets/resume.txt'
        with open(resumePath, 'r') as f:
            text = cipher.decrypt(f.read()).decode()
            return text, 200, {'Content-Type': 'text/plain'}
    else:
        abort(401)

@app.post('/contact')
@limiter.limit("3 per minute")
def contact():
    body = request.get_json(silent=True)
    if not body:
        return jsonify(error="Invalid JSON"), 400
    for field in ('email', 'subject', 'message'):
        if field not in body or not body[field]:
            return jsonify(error=f"Missing field: {field}"), 400
    try:
        botSender = "tamitai147@gmail.com"
        receiver = "tamitai147+tamirtech@gmail.com"
        subject = "EMAIL FROM " + body['email'] + ': ' + body['subject']
        password = os.getenv('EMAIL_PASSWORD')
        yag = yagmail.SMTP(botSender, password)
        yag.send(to=receiver, subject=subject, contents=body['message'])
        return '', 200
    except Exception as e:
        return '', 500

    
