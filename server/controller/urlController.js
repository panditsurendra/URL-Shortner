const URL = require('../models/url');
const validUrl = require('valid-url');
const shortid = require('shortid');

async function handleGenerateNewShortUrl(req, res) {
    console.log("Received request to shorten URL:", req.body);
    const { originalUrl, customAlias } = req.body;

    if (!validUrl.isUri(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL provided.' });
    }

    try {
        let urlId; // Declare urlId here

        if (customAlias) {
            // If a custom alias IS provided, check if it exists
            const existingUrl = await URL.findOne({ shortUrlId: customAlias });
            if (existingUrl) {
                return res.status(400).json({ error: 'Alias is already in use.' });
            }
            urlId = customAlias; // Use the custom alias
        } else {
            // If no custom alias is provided, generate a new one
            urlId = shortid.generate();
        }

        // Now, urlId will always have a valid value
        const newUrl = new URL({
            originalUrl,
            shortUrlId: urlId,
            createdBy: req.user.userId,
        });

        await newUrl.save();
        res.status(201).json(newUrl);

    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};


async function handleGetAllUrls(req, res) {
    try {
        const urls = await URL.find({ createdBy: req.user.userId }).sort({ date: -1 });
        return res.json(urls);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = { handleGenerateNewShortUrl, handleGetAllUrls };

