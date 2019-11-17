const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// Get list of ninjas from DB
router.get('/ninjas', (req, res, next) => {
    /*Ninja.find({}).then((ninjas) => {
        res.send(ninjas)
    }) */
    Ninja.geoNear({
        type: 'Point',
        coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]
    },
        { maxDistance: 100000, spherical: true }
    ).then((ninjas) => {
        res.send(ninjas);
    })
})

// Add a new Ninja to the DB
router.post('/ninjas', (req, res, next) => {

    // We are creating New instance of Ninja
    // var ninja = new Ninja(req.body);
    // ninja.save();

    // It will automatically creates a new Instance of Ninja
    Ninja.create(req.body).then((ninja) => {
        // if(err) return console.log('Err',err);
        res.send(ninja);
    }).catch(next);
})

// Update the ninjs in the DB
router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Ninja.findOne({ _id: req.params.id }).then((ninja) => {
            res.send(ninja);
        });
    })
})

// Delete a ninja from the DB
router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({ _id: req.params.id }).then((ninja) => {
        res.send(ninja);
    })
})

module.exports = router;