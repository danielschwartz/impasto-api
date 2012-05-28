
/**
 * Module dependencies.
 */

// Setup Global Vars
GLOBAL.__root = __dirname;
GLOBAL.NodeEnv = process.env.NODE_ENV;
GLOBAL.GlobalConfig = require('konphyg')('./configs')('site');
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

// If were in prod, lets write it to some files, we'll also add Loggly eventually
if(NodeEnv === 'production'){
	Logger.add(winston.transports.File, {
		filename: __root + '/logs/main.log',
	})
}

// Init Global DB
var sequelize = require('sequelize'),
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
		dbOptions.port 		= 80;
		dbOptions.dialect 	= 'postgres';
		break;
}

GLOBAL.db = new sequelize(dbOptions.name, dbOptions.user, dbOptions.pass, {
	host: dbOptions.host,
	port: dbOptions.port,
	dialect: dbOptions.dialect,
	pool: {
		maxConnections: 5,
		maxIdleTime: 30
	},
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

var express = require('express'),
	seeds = require(__root + "/libraries/seed");

var app = module.exports = express.createServer();

// Setup Associations
require(__root + "/libraries/ModelAssociations");

// Setup ServiceLoader
GLOBAL.ServiceLoader = require(__root + '/libraries/ServiceLoader');


// Setup DB Sync and Seed Data if --seed flag is given
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
