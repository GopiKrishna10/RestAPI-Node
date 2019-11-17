const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up expredd app
const app = express();

// Connect to Mongo DB
mongoose.connect('mongodb://localhost:27017/ninjago', { useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true });
// mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());

// initialize routes Only /api endPoint routes will trigger by using this middleware
app.use('/api', routes);

// Error handling Middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
})

// listen to request 
app.listen(process.env.port || 4000, () => {
    console.log('Port Listening on 4000');
});

// To Fix all Deprecation warnings

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// Replace update() with updateOne(), updateMany(), or replaceOne()
// Replace remove() with deleteOne() or deleteMany().
// Replace count() with countDocuments(), unless you want to count how many documents are in the whole collection(no filter).In the latter case, use estimatedDocumentCount().