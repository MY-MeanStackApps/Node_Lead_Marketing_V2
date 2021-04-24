var express = require('express');
var router = express.Router();
const Calender = require('../models/calender');

router.post('/create', async function(req, res, next) {
    var tsk = await Calender.create(req.body);
    res.json({ message: 'success', data: tsk });
})

router.get('/getall/:id', async function(req, res, next) {
    console.log('-----------')
    console.log(req.params.id)
    console.log('-----------')
    var cal = await Calender.find({ lead: req.params.id });
    res.json({ message: 'success', data: cal });
})

router.get('/:id', async function(req, res, next) {
    var single = await Calender.find({ _id: req.params.id });
    res.json({ message: 'success', data: single });
});

router.delete('/:id', async function(req, res, next) {
    await Calender.deleteOne({ _id: req.params.id });
    res.json({ message: 'success' });
});

router.post('/update', async function(req, res, next) {
    await Calender.updateOne({
        _id: req.body.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' })
});

module.exports = router;