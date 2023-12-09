from flask import Flask, request, abort
from flask_restful import Api
from json import loads
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
api = Api(app)


@app.post('/resume')
def resume():
    body = loads(request.data)
    if body['password'] == os.getenv('RESUME_PASSWORD'):
        with open("assets/resume.txt") as f:
            data = f.read()
        return data
    else:
        abort(401)