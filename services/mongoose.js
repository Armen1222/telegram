const mongoose = require('mongoose');
const options = require('../config');

const url = `${options.mongoDB.host}:${options.mongoDB.port}/${options.mongoDB.database}`;
mongoose.set('debug', true);

mongoose.connection.on('error', function(err) {
    //appUtl.log.error("Cannot connect to mongoDB");
    console.log("Cannot connect to mongoDB");
});

mongoose.connection.once('open', function (callback) {
	console.log(`Connection to database is established (${url})`);
});

mongoose.set('debug', true);
mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;
