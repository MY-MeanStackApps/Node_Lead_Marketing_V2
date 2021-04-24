var express = require('express');
var router = express.Router();
const Event = require('../models/events');

router.post('/create', async function(req, res, next) {
    console.log(req.body);
    var tsk = await Event.create(req.body);
    res.json({ message: 'success', data: tsk });
})


router.get('/getall/:id', async function(req, res, next) {
    var event = await Event.find({ lead: req.params.id }).populate('lead');
    res.json({ message: 'success', data: event });
})

router.get('/:id', async function(req, res, next) {
    var single = await Event.find({ _id: req.params.id });
    res.json({ message: 'success', data: single });
});

router.delete('/:id', async function(req, res, next) {
    await Event.deleteOne({ _id: req.params.id });
    res.json({ message: 'success' });
});

router.post('/update', async function(req, res, next) {
    console.log(req.body)
    await Event.updateOne({
        _id: req.body.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' })
});

module.exports = router;