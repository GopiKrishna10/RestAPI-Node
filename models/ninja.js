const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create geoLocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinaes: {
        type: [Number],
        index: "2dsphere"
    }
})
// create Ninja Schema & model

const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is Required'],
    },
    rank: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry:GeoSchema
    // add in geoLocation
});

const Ninja = mongoose.model('ninja', NinjaSchema);
module.exports = Ninja;
