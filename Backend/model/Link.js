const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    totalClicks: { type: Number, default: 0 }
});

module.exports = mongoose.model('Link', linkSchema);
