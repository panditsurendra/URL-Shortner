const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { handleGenerateNewShortUrl, handleGetAllUrls } = require('../controller/urlController');

// @route   POST /api/urls/shorten
// @desc    Create a short URL (Protected)
router.post('/shorten', authMiddleware, handleGenerateNewShortUrl);

// @route   GET /api/urls
// @desc    Get all URLs for a user (Protected)
router.get('/', authMiddleware, handleGetAllUrls);

module.exports = router;
