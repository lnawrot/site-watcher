var mongo  = require('mongodb');
var config = require('./config.json').dbConnection;

var server = new mongo.Server( config.host, config.port, {auto_reconnect: true} ),
	db     = new mongo.Db( config.name, server, {safe: true} );

db.open(function(err, db) {
	if(!err) {
		console.log("Connected to MongoDB: " + config.host + " " + config.port + " " + config.name);
	}
});

exports.connect = function() {
	return db;
}