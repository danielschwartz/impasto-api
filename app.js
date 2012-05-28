
/**
 * Module dependencies.
 */

GLOBAL.__root = __dirname;

// Init Global DB
var sequelize = require('sequelize');
GLOBAL.db = new sequelize('impasto_core', 'root', 'root', {
  host: "127.0.0.1",
  port: 8889,
  dialect: 'mysql',
  pool: {
  	maxConnections: 5,
  	maxIdleTime: 30
  }
});

var express = require('express'),
	routes 	= require('./routes'),
	seeds	= require(GLOBAL.__root + "/libraries/seed");

var app = module.exports = express.createServer();

// Setup Associations
require(GLOBAL.__root + "/libraries/ModelAssociations")

// Setup DB Sync and Seed Data
GLOBAL.db.sync({force: true}).on('success', function() {
	console.log('MySQL schema created');
	console.log('Creating Seed Data');
	seeds.initUserPieces();
}).on('failure', function() {
	console.log(arguments);
	console.log('MySQL schema cannot be created');
});

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hbs');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
