const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    subject: String,
    comment: String,
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "lead" }
}, { timestamps: true }, )
module.exports = mongoose.model('log', schema)