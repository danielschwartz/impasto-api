
/**
 * Module dependencies.
 */

// Setup Global Vars
GLOBAL.__root = __dirname;
GLOBAL.NodeEnv = process.env.NODE_ENV || 'development';
GLOBAL.GlobalConfig = require('konphyg')('./configs')('site');
GLOBAL.DataResponder = require(__root + '/libraries/DataResponder');
GLOBAL.ErrorResponder = require(__root + '/libraries/ErrorResponder');
GLOBAL.Memory = require('memory-cache');
GLOBAL._ = require('underscore');

// Mixin Underscore.String into Underscore
_.str = require('underscore.string');
_.mixin(_.str.exports());

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

// Init Global DB
var Sequelize = require('sequelize'),
    dbOptions = {};

switch(NodeEnv){
    case 'development':
        dbOptions.name          = GlobalConfig.db.name;
        dbOptions.user          = GlobalConfig.db.user;
        dbOptions.pass          = GlobalConfig.db.pass;
        dbOptions.host          = GlobalConfig.db.host;
        dbOptions.port          = GlobalConfig.db.port;
        dbOptions.dialect       = GlobalConfig.db.dialect;
        dbOptions.disablePort   = false;
        break;
    case 'production':
        var url     = require('url'),
            dbUrl   = url.parse(process.env.DATABASE_URL),
            authArr = dbUrl.auth.split(':');

        dbOptions.name          = dbUrl.path.substring(1);
        dbOptions.user          = authArr[0];
        dbOptions.pass          = authArr[1];
        dbOptions.host          = dbUrl.host;
        dbOptions.dialect       = 'postgres';
        dbOptions.protocol      = 'postgres';
        dbOptions.disablePort   = true;
        break;
}

GLOBAL.db = new Sequelize(dbOptions.name, dbOptions.user, dbOptions.pass, {
    host: dbOptions.host,
    port: dbOptions.port,
    dialect: dbOptions.dialect,
    protocol: dbOptions.protocol,
    disablePort: dbOptions.disablePort,
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

var express = require('express');

var app = module.exports = express.createServer();

// Setup Associations
require(__root + "/libraries/ModelAssociations");

// Setup ServiceLoader
GLOBAL.ServiceLoader = require(__root + '/libraries/ServiceLoader');


// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
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

// Add Underscore.js as view engine
app.register('.html', {
    compile: function(str, options){
        var template = _.template(str);
        return function(locals){
            return template(locals);
        };
    }
});

// Routes
require('./routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
