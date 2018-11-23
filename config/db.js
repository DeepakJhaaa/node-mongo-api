var mongoose = require('mongoose');
var env = require('node-env-file');

// ====== Import the Environment file ======
if (process.env.NODE_ENV !== 'production') {
    env(__dirname + '/.env');
}

// ====== Create database connection to mongoDB =====
mongoose.connect(process.env.MONGODB_URI_NEW, {
    useNewUrlParser: true
});

// ====== When connection is successful ======
mongoose.connection.on('connected', function () {
    console.log('Mongoose Successfully connected to MongoDB Server');
});

// ====== When connection throws an error ======
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// ====== When connection is disconnected ======
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// ====== When Node process ends, close mongoose connection ======
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});