const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { createShortLink } = require('../controller/linkController');
const Link = require('../model/Link');
const Click = require('../model/Click');

router.post('/shorten', auth, createShortLink);
router.get('/user-links', auth, async (req, res) => {
    try {
        const userId = req.user.id;

        const links = await Link.find({ userId }).sort({ createdAt: -1 });

        const data = await Promise.all(
            links.map(async (link) => {
                const clicks = await Click.find({ linkId: link._id });

                return {
                    ...link.toObject(),
                    totalClicks: clicks.length,
                    clicksOverTime: clicks.map((c) => c.timestamp),
                    browserData: clicks.map((c) => c.browser),
                    deviceData: clicks.map((c) => c.device),
                };
            })
        );

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching links' });
    }
});

module.exports = router;
