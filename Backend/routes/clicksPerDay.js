const express = require('express');
const router = express.Router();
const Click = require('../model/Click');

router.get('/clicks-per-day', async (req, res) => {
    try {
        const data = await Click.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
                    },
                    clicks: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    date: "$_id",
                    clicks: 1,
                    _id: 0
                }
            }
        ]);

        res.json(data);
    } catch (err) {
        console.error('Aggregation error:', err);
        res.status(500).json({ message: 'Failed to get analytics' });
    }
});

router.get('/device-browser-breakdown', async (req, res) => {
    try {
        const results = await Click.aggregate([
            {
                $addFields: {
                    browser: { $ifNull: ["$browser", "Device"] }
                }
            },
            {
                $group: {
                    _id: {
                        device: "$device",
                        browser: "$browser"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    device: "$_id.device",
                    browser: {
                        $ifNull: ["$_id.browser", "Device"]
                    },
                    count: 1
                }
            }
        ]);

        res.json(results);
    } catch (err) {
        console.error("Breakdown error:", err);
        res.status(500).json({ message: "Server error while aggregating device/browser data." });
    }
});


module.exports = router;
