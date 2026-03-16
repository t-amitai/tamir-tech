import logging
import os
import time
from datetime import datetime, timezone

import requests
from flask import Blueprint, jsonify

logger = logging.getLogger(__name__)

SITE_URL = os.getenv('SITE_URL', 'https://tamir.tech')
PSI_API_KEY = os.getenv('PSI_API_KEY')
PSI_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
CACHE_TTL = 300  # 5 minutes

_cache = {'data': None, 'timestamp': 0}


def create_lighthouse_bp(limiter):
    bp = Blueprint('lighthouse', __name__)

    @bp.get('/lighthouse')
    @limiter.limit("2 per minute")
    def lighthouse():
        now = time.time()
        if _cache['data'] and now - _cache['timestamp'] < CACHE_TTL:
            return jsonify({**_cache['data'], 'cached': True})

        if not PSI_API_KEY:
            logger.error("PSI_API_KEY environment variable not set")
            return jsonify(error='PageSpeed Insights API not configured'), 503

        try:
            response = requests.get(
                PSI_API_URL,
                params=[
                    ('url', SITE_URL),
                    ('strategy', 'mobile'),
                    ('category', 'performance'),
                    ('category', 'accessibility'),
                    ('category', 'best-practices'),
                    ('category', 'seo'),
                    ('key', PSI_API_KEY),
                ],
                timeout=45,
            )
        except requests.Timeout:
            logger.error("PageSpeed Insights request timed out")
            return jsonify(error='PageSpeed Insights request timed out'), 504
        except requests.RequestException as e:
            logger.exception("PageSpeed Insights request failed: %s", e)
            return jsonify(error='Failed to reach PageSpeed Insights API'), 502

        if not response.ok:
            body = response.json() if response.headers.get('content-type', '').startswith('application/json') else {}
            msg = body.get('error', {}).get('message', response.reason)
            logger.error("PSI API returned %s: %s", response.status_code, msg)
            return jsonify(error=f'PageSpeed Insights error: {msg}'), 502

        result = response.json()

        categories = result.get('lighthouseResult', {}).get('categories', {})
        audits = result.get('lighthouseResult', {}).get('audits', {})

        scores = {
            'performance': round((categories.get('performance', {}).get('score') or 0) * 100),
            'accessibility': round((categories.get('accessibility', {}).get('score') or 0) * 100),
            'bestPractices': round((categories.get('best-practices', {}).get('score') or 0) * 100),
            'seo': round((categories.get('seo', {}).get('score') or 0) * 100),
        }

        metrics = {
            'firstContentfulPaint': round(audits.get('first-contentful-paint', {}).get('numericValue', 0) / 1000, 1),
            'largestContentfulPaint': round(audits.get('largest-contentful-paint', {}).get('numericValue', 0) / 1000, 1),
            'totalBlockingTime': round(audits.get('total-blocking-time', {}).get('numericValue', 0)),
            'cumulativeLayoutShift': round(audits.get('cumulative-layout-shift', {}).get('numericValue', 0), 3),
            'speedIndex': round(audits.get('speed-index', {}).get('numericValue', 0) / 1000, 1),
        }

        fetched_at = datetime.now(timezone.utc).isoformat()
        data = {'scores': scores, 'metrics': metrics, 'fetchedAt': fetched_at}

        _cache['data'] = data
        _cache['timestamp'] = now

        return jsonify({**data, 'cached': False})

    return bp
