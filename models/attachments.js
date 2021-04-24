const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    lastmodyfied: String,
    size: String,
    type: String,
    file: String,
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "lead" }
}, { timestamps: true }, )
module.exports = mongoose.model('attacment', schema)