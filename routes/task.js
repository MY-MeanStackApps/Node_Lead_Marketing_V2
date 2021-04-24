var express = require('express');
var passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");
var router = express.Router();
const Task = require('../models/task');

router.post('/create', async function(req, res, next) {
    console.log(req.body);
    var tsk = await Task.create(req.body);
    res.json({ message: 'success', data: tsk });
})


router.get('/getall/:id', async function(req, res, next) {
    console.log(req.params.id)
    var tsk = await Task.find({ lead: req.params.id }).populate('lead');
    // console.log(tsk)
    res.json({ message: 'success', data: tsk });
})

router.get('/:id', async function(req, res, next) {
    var single = await Task.find({ _id: req.params.id });
    res.json({ message: 'success', data: single });
});

router.delete('/:id', async function(req, res, next) {
    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: 'success' });
});

router.post('/update/:id', async function(req, res, next) {
    await Task.updateOne({
        _id: req.params.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' })
});

module.exports = router;