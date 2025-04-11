const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { createShortLink } = require('../controllers/linkController');

router.post('/shorten', auth, createShortLink);

module.exports = router;
