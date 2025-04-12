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

router.get('/', auth, async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const query = {
        userId: req.user.id,
        originalUrl: { $regex: search, $options: 'i' }
    };

    try {
        const links = await Link.find(query)
            .sort({ createdAt: -1 })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        const total = await Link.countDocuments(query);

        res.json({
            links,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while fetching paginated links" });
    }
});


module.exports = router;
