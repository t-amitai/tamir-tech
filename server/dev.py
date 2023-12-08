from flask import Flask, send_from_directory, request, abort
from flask_restful import Api
from json import loads
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_url_path='', static_folder='./../client/dist')
api = Api(app)


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.post('/resume')
def resume():
    body = loads(request.data)
    if body['password'] == os.getenv('RESUME_PASSWORD'):
        with open("assets/resume.txt") as f:
            data = f.read()
        return data
    else:
        abort(401)



