var express = require('express');
var passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");
var router = express.Router();
const LEAD = require('../models/lead');

router.post('/create', async function(req, res, next) {
    // console.log(req.body);
    var isExistemail = await LEAD.findOne({ email: req.body.email });
    var isExistPhone = await LEAD.findOne({ phone: req.body.phone });
    if (isExistemail) {
        res.json({ message: 'email already' });
    } else if (isExistPhone) {
        res.json({ message: 'phone already' });
    } else {
        var leadData = await LEAD.create(req.body);
        res.json({ message: 'success', data: leadData });
    }
})

router.post('/create/csv', async function(req, res, next) {
    var alreday = [];
    var store_email = [];

    for (let i = 0; i < req.body.arr.length; i++) {
        store_email.push(req.body.arr[i].email);
        alreday = await LEAD.find({ email: store_email, });
    }

    for (let j = 0; j < alreday.length; j++) {
        var deleted = await LEAD.deleteOne({ _id: alreday[j]._id });
    }

    for (let k = 0; k < req.body.arr.length; k++) {
        var leadData = await LEAD.create({
            name: req.body.arr[k].name,
            email: req.body.arr[k].email,
            phone: req.body.arr[k].phone
        });
    }
    res.json({ message: 'success', data: leadData })
})

router.get('/getall', async function(req, res, next) {
    var fetchLead = await LEAD.find();
    res.json({ message: 'success', data: fetchLead });
})

router.get('/:id', async function(req, res, next) {
    var single = await LEAD.find({ _id: req.params.id });
    res.json({ message: 'success', data: single });
});

router.delete('/:id', async function(req, res, next) {
    var del_lead = await LEAD.deleteOne({ _id: req.params.id });
    res.json({ message: 'success' });
});

router.post('/update', async function(req, res, next) {

    LEAD.findOne({ _id: req.body.id }).then(fetch => {
        if (fetch.email == req.body.email) {
            LEAD.updateOne({
                _id: req.body.id
            }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                }
            }).then(fetch => {
                res.json({ message: 'success' })
            });
        } else if (fetch.email != req.body.email) {
            LEAD.findOne({ email: req.body.email }).then(isExist => {
                if (isExist) {
                    res.json({ message: 'email already taken' })
                } else {
                    LEAD.updateOne({
                        _id: req.body.id
                    }, {
                        $set: {
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone,
                        }
                    }).then(fetch => {
                        res.json({ message: 'success' })
                    });
                }
            });
        }
    });
});

module.exports = router;