
/**
 * Module dependencies.
 */

// Setup Global Vars
GLOBAL.__root = __dirname;
GLOBAL.NodeEnv = process.env.NODE_ENV || 'development';
GLOBAL.GlobalConfig = require('konphyg')('./configs')('site');

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

// If were in prod, lets write it to some files, we'll also add Loggly eventually
if(NodeEnv === 'production'){
	Logger.add(winston.transports.File, {
		filename: __root + '/logs/main.log',
	})
}

// Init Global DB
var Sequelize = require('sequelize'),
	dbOptions = {};

switch(NodeEnv){
	case 'development':
		dbOptions.name 		= GlobalConfig.db.name;
		dbOptions.user 		= GlobalConfig.db.user;
		dbOptions.pass 		= GlobalConfig.db.pass;
		dbOptions.host 		= GlobalConfig.db.host;
		dbOptions.port 		= GlobalConfig.db.port;
		dbOptions.dialect 	= GlobalConfig.db.dialect;
		break;
	case 'production':
		var url 	= require('url'),
			dbUrl 	= url.parse(process.env.DATABASE_URL),
			authArr = dbUrl.auth.split(':');

		dbOptions.name 		= dbUrl.path.substring(1);
		dbOptions.user 		= authArr[0];
		dbOptions.pass 		= authArr[1];
		dbOptions.host 		= dbUrl.host;
		dbOptions.dialect 	= 'postgres';
		break;
}

GLOBAL.db = new Sequelize(dbOptions.name, dbOptions.user, dbOptions.pass, {
	host: dbOptions.host,
	dialect: dbOptions.dialect,
	define: {
		instanceMethods: {
			// toJson method
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

var express = require('express');

var app = module.exports = express.createServer();

// Setup Associations
require(__root + "/libraries/ModelAssociations");

// Setup ServiceLoader
GLOBAL.ServiceLoader = require(__root + '/libraries/ServiceLoader');

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
