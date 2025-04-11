const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    timestamp: Date,
    ip: String,
    device: String,
    browser: String
});

module.exports = mongoose.model('Click', clickSchema);
