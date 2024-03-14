from flask import Flask, send_from_directory, request, abort
import yagmail
from json import loads
from cryptography.fernet import Fernet
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__, static_url_path='', static_folder='./../client/dist')


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.post('/resume')
def resume():
    body = loads(request.data)
    if body['password'] == os.getenv('RESUME_PASSWORD'):
        key = os.getenv('RESUME_KEY')
        cipher = Fernet(key.encode())
        resumePath = os.getcwd() + '/server/assets/resume.txt'
        with open(resumePath, 'r') as f:
            text = cipher.decrypt(f.read()).decode()
            return text, 200, {'Content-Type': 'text/plain'}
    else:
        abort(401)

@app.post('/contact')
def contact():
    try:
        body = loads(request.data)
        botSender = "tamitai147@gmail.com"
        receiver = "tamitai147+tamirtech@gmail.com"
        subject = "EMAIL FROM " + body['email'] + ': ' + body['subject']
        password = os.getenv('EMAIL_PASSWORD')
        yag = yagmail.SMTP(botSender, password)
        yag.send(to=receiver, subject=subject, contents=body['message'])
        return '', 200
    except Exception as e:
        return '', 500

    
