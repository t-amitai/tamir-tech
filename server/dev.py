import base64
from flask import Flask, send_from_directory
from flask_restful import Api
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_url_path='', static_folder='./../client/dist')
api = Api(app)


def request_resume(password):
    return password == os.getenv('RESUME_PASSWORD')


def return_resume():
    return 'resume'
    #     with open("resume.pdf", "rb") as pdf_file:
    #         encoded_string = base64.b64encode(pdf_file.read())
    #         return encoded_string


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route('/resume')
def resume():
    if request.method == 'GET':
        if request_resume(request.form['password']):
            return return_resume()
        else:
            return 'Invalid password'



