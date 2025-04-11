const Link = require('../models/Link');
const { nanoid } = require('nanoid');

exports.createShortLink = async (req, res) => {
    const { originalUrl, customAlias, expiresAt } = req.body;
    const userEmail = req.user.email;

    try {
        const shortCode = customAlias || nanoid(6);

        // Prevent duplicate custom aliases
        const existing = await Link.findOne({ shortCode });
        if (existing) return res.status(400).json({ message: 'Alias already in use' });

        const newLink = new Link({
            userEmail,
            originalUrl,
            shortCode,
            expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        });

        await newLink.save();

        res.json({
            shortUrl: `https://yourdomain.com/${shortCode}`,
            shortCode
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
