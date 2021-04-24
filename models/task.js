const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    subject: String,
    date: String,
    status: String,
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "lead" }
}, { timestamps: true }, )
module.exports = mongoose.model('task', schema)