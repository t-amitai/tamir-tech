import logging
import os

import requests
from flask import Blueprint, jsonify, request

logger = logging.getLogger(__name__)

GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'


def create_github_bp(limiter):
    bp = Blueprint('github', __name__)

    @bp.post('/github/graphql')
    @limiter.limit("10 per minute")
    def github_graphql():
        if not GITHUB_TOKEN:
            logger.error("GITHUB_TOKEN environment variable not set")
            return jsonify(error='GitHub API not configured'), 503

        body = request.get_json(silent=True)
        if not body or 'query' not in body:
            return jsonify(error='Missing GraphQL query'), 400

        try:
            response = requests.post(
                GITHUB_GRAPHQL_URL,
                json={
                    'query': body['query'],
                    'variables': body.get('variables', {}),
                },
                headers={
                    'Authorization': f'Bearer {GITHUB_TOKEN}',
                    'Content-Type': 'application/json',
                },
                timeout=10,
            )

            if response.status_code == 401:
                logger.error("GitHub token is invalid or expired")
                return jsonify(error='GitHub authentication failed'), 502

            if response.status_code == 403:
                logger.warning("GitHub API rate limit exceeded")
                return jsonify(error='GitHub API rate limit exceeded'), 429

            return jsonify(response.json()), response.status_code

        except requests.Timeout:
            logger.error("GitHub API request timed out")
            return jsonify(error='GitHub API request timed out'), 504
        except requests.RequestException as e:
            logger.exception("GitHub API request failed: %s", e)
            return jsonify(error='Failed to reach GitHub API'), 502

    return bp
