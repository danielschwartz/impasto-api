
/**
 * Module dependencies.
 */

GLOBAL.__root = __dirname;
GLOBAL.NodeEnv = process.env.NODE_ENV;
GLOBAL.db_seed = false;
if(process.argv.indexOf('--seed') > -1){
	GLOBAL.db_seed = true;
}

// Init Global Logger
var winston = require('winston');
GLOBAL.Logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			colorize: true,
			timestamp: true
		})
	]
});

if(NodeEnv === 'production'){
	Logger.add(winston.transports.File, {
		filename: __root + '/logs/main.log',
	})
}

Logger.info('yay!');


// Init Global DB
var sequelize = require('sequelize');
GLOBAL.db = new sequelize('impasto_core', 'root', 'root', {
  host: "127.0.0.1",
  port: 8889,
  dialect: 'mysql',
  pool: {
  	maxConnections: 5,
  	maxIdleTime: 30
  },
  define: {
  	instanceMethods: {
  		mapAttributes: function(){
  			var obj = new Object(),
	            ctx = this;
	        ctx.attributes.forEach(function(attr) {
	            obj[attr] = ctx[attr];
	        });

	        return obj;
  		}
  	}
  }
});

var express = require('express'),
	seeds	= require(__root + "/libraries/seed");

var app = module.exports = express.createServer();

// Setup Associations
require(__root + "/libraries/ModelAssociations");

// Setup ServiceLoader
GLOBAL.ServiceLoader = require(__root + '/libraries/ServiceLoader');


// Setup DB Sync and Seed Data
if(db_seed){
	GLOBAL.db.sync({force: true}).on('success', function() {
		console.log('MySQL schema created');
		console.log('Creating Seed Data');
		seeds.initUserPieces();
	}).on('failure', function() {
		console.log(arguments);
		console.log('MySQL schema cannot be created');
	});
}

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
require('./routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
