const router = require('express').Router();
const Link = require('../model/Link');
const Click = require('../model/Click');
const uaParser = require('ua-parser-js');

router.get('/:code', async (req, res) => {
    const shortCode = req.params.code;

    try {
        const link = await Link.findOne({ shortCode });

        if (!link) return res.status(404).send('Link not found');

        if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
            return res.status(410).send('Link has expired');
        }

        const ua = uaParser(req.headers['user-agent']);
        const clickData = {
            linkId: link._id,
            timestamp: new Date(),
            ip: req.ip,
            device: ua.device.type || 'desktop',
            browser: ua.browser.name,
        };

        Click.create(clickData).catch(err => console.error('Click save error', err));

        link.totalClicks += 1;
        link.save().catch(err => console.error('Click count update error', err));

        res.redirect(link.originalUrl);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
