var express = require('express');
var router = express.Router();
const Log = require('../models/callAlog');

router.post('/create', async function(req, res, next) {
    console.log(req.body);
    var tsk = await Log.create(req.body);
    res.json({ message: 'success', data: tsk });
})


router.get('/getall/:id', async function(req, res, next) {
    var callAlog = await Log.find({ lead: req.params.id }).populate('lead');
    res.json({ message: 'success', data: callAlog });
})

router.get('/:id', async function(req, res, next) {
    var single = await Log.find({ _id: req.params.id });
    res.json({ message: 'success', data: single });
});

router.delete('/:id', async function(req, res, next) {
    await Log.deleteOne({ _id: req.params.id });
    res.json({ message: 'success' });
});

router.post('/update/:id', async function(req, res, next) {
    await Log.updateOne({
        _id: req.params.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' })
});

module.exports = router;