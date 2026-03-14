import logging
import os

from flask import Flask, send_from_directory, request, abort, jsonify
from flask_compress import Compress
from werkzeug.security import check_password_hash
from cryptography.fernet import Fernet
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv

from server.contact import create_contact_bp

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_url_path='', static_folder='./../client/dist')
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024  # 1MB
Compress(app)

limiter = Limiter(get_remote_address, app=app, storage_uri="memory://")
app.register_blueprint(create_contact_bp(limiter))


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.after_request
def add_cache_headers(response):
    if request.path.endswith(('.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.svg')):
        response.cache_control.max_age = 31536000
        response.cache_control.public = True
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    return response


@app.post('/resume')
@limiter.limit("5 per minute")
def resume():
    body = request.get_json(silent=True)
    if not body or 'password' not in body:
        return jsonify(error="Missing password"), 400
    if check_password_hash(os.getenv('RESUME_PASSWORD_HASH'), body['password']):
        key = os.getenv('RESUME_KEY')
        resume_path = os.path.join(os.path.dirname(__file__), 'assets', 'resume.txt')
        try:
            cipher = Fernet(key.encode())
            with open(resume_path, 'r') as f:
                text = cipher.decrypt(f.read()).decode()
                return text, 200, {'Content-Type': 'text/plain'}
        except FileNotFoundError:
            logger.error("Resume file not found at %s", resume_path)
            return jsonify(error="Resume not available"), 500
        except Exception:
            logger.exception("Error decrypting resume")
            return jsonify(error="Internal server error"), 500
    else:
        abort(401)


@app.errorhandler(404)
def not_found(e):
    return jsonify(error='Not found'), 404


@app.errorhandler(413)
def too_large(e):
    return jsonify(error='Payload too large'), 413


@app.errorhandler(500)
def server_error(e):
    return jsonify(error='Internal server error'), 500
