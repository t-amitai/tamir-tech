from flask import Flask, send_from_directory, request, abort
from json import loads
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
        resumePath = os.getcwd() + '/server/assets/resume.txt'
        with open(resumePath, 'r') as f:
            return f.read(), 200, {'Content-Type': 'text/plain'}
    else:
        abort(401)

