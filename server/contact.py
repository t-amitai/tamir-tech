import json
import logging
import os
import re
import smtplib
import tempfile

import yagmail
from flask import Blueprint, jsonify, request

logger = logging.getLogger(__name__)

SENDER_EMAIL = os.getenv('SENDER_EMAIL', 'tamitai147@gmail.com')
RECEIVER_EMAIL = os.getenv('RECEIVER_EMAIL', 'tamitai147+tamirtech@gmail.com')

MAX_EMAIL_LEN = 254
MAX_SUBJECT_LEN = 200
MAX_MESSAGE_LEN = 5000

_EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')


def _get_oauth2_file():
    """Build a yagmail-compatible OAuth2 JSON file from env vars."""
    oauth2_creds = {
        "email_address": SENDER_EMAIL,
        "client_id": os.environ["GOOGLE_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_CLIENT_SECRET"],
        "refresh_token": os.environ["GOOGLE_REFRESH_TOKEN"],
    }
    fd, path = tempfile.mkstemp(suffix=".json")
    with os.fdopen(fd, "w") as f:
        json.dump(oauth2_creds, f)
    return path


def validate_contact(body):
    errors = []
    email = body.get('email', '')
    subject = body.get('subject', '')
    message = body.get('message', '')

    if not email:
        errors.append('Email is required')
    elif len(email) > MAX_EMAIL_LEN:
        errors.append('Email is too long')
    elif not _EMAIL_RE.match(email):
        errors.append('Please enter a valid email')

    if not subject:
        errors.append('Subject is required')
    elif len(subject) > MAX_SUBJECT_LEN:
        errors.append('Subject must be under 200 characters')

    if not message:
        errors.append('Message is required')
    elif len(message) > MAX_MESSAGE_LEN:
        errors.append('Message must be under 5000 characters')

    return errors


def create_contact_bp(limiter):
    bp = Blueprint('contact', __name__)

    @bp.post('/contact')
    @limiter.limit("3 per minute")
    def contact():
        body = request.get_json(silent=True)
        if not body:
            return jsonify(errors=['Invalid JSON']), 400

        errors = validate_contact(body)
        if errors:
            return jsonify(errors=errors), 400

        try:
            oauth2_file = _get_oauth2_file()
            yag = yagmail.SMTP(SENDER_EMAIL, oauth2_file=oauth2_file)
            subject = f"EMAIL FROM {body['email']}: {body['subject']}"
            yag.send(to=RECEIVER_EMAIL, subject=subject, contents=body['message'])
            logger.info("Contact email sent from %s", body['email'])
            return '', 200
        except smtplib.SMTPAuthenticationError:
            logger.error("SMTP authentication failed")
            return jsonify(errors=['Email service unavailable']), 503
        except smtplib.SMTPException as e:
            logger.error("SMTP error: %s", e)
            return jsonify(errors=['Email service unavailable']), 503
        except Exception:
            logger.exception("Unexpected error sending contact email")
            return jsonify(errors=['Internal server error']), 500

    return bp
