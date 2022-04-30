from flask import Flask, escape, request, send_from_directory


app = Flask(__name__, static_url_path='', static_folder='./../client/dist')


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

