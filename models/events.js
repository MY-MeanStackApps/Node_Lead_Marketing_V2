const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    type: String,
    startdate: String,
    enddate: String,
    starttime: String,
    endtime: String,
    allday: String,
    description: String,
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "lead" }
}, { timestamps: true }, )
module.exports = mongoose.model('event', schema)