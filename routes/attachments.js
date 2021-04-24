var express = require('express');
var router = express.Router();
const Attach = require('../models/attachments');

router.post('/create', async function(req, res, next) {
    console.log(req.body);
    var tsk = await Attach.create(req.body);
    res.json({ message: 'success', data: tsk });
})


router.get('/getall/:id', async function(req, res, next) {
    var g = await Attach.find({ lead: req.params.id }).populate('lead');
    res.json({ message: 'success', data: g });
})

router.get('/:id', async function(req, res, next) {
    var single = await Attach.find({ _id: req.params.id });
    res.json({ message: 'success', data: single });
});

router.delete('/:id', async function(req, res, next) {
    await Attach.deleteOne({ _id: req.params.id });
    res.json({ message: 'success' });
});

router.post('/update', async function(req, res, next) {
    await Attach.updateOne({
        _id: req.body.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' })
});

module.exports = router;