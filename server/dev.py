from flask import Flask
from flask_restful import Api

app = Flask(__name__, static_url_path='', static_folder='./../client/dist')
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')