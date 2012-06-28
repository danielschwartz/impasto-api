// Setup Global Vars
GLOBAL.__root = __dirname;
GLOBAL.NodeEnv = process.env.NODE_ENV || 'development';
GLOBAL._ = require('underscore');

// Mixin Underscore.String into Underscore
_.str = require('underscore.string');
_.mixin(_.str.exports());

// Global Impasto Object + Modules
GLOBAL.Impasto = {
    Config: require('konphyg')('./configs')('site'),
    DataResponder: require(__root + '/libraries/DataResponder'),
    ErrorResponder: require(__root + '/libraries/ErrorResponder'),
    Memory: require('memory-cache')
}

// Init Global Logger
var winston = require('winston');
Impasto.Logger = new (winston.Logger)({
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
        dbOptions.name          = Impasto.Config.db.name;
        dbOptions.user          = Impasto.Config.db.user;
        dbOptions.pass          = Impasto.Config.db.pass;
        dbOptions.host          = Impasto.Config.db.host;
        dbOptions.port          = Impasto.Config.db.port;
        dbOptions.dialect       = Impasto.Config.db.dialect;
        dbOptions.disablePort   = false;
        break;
    case 'production':
        var url     = require('url'),
            dbUrl   = url.parse(process.env.HEROKU_POSTGRESQL_COPPER_URL),
            authArr = dbUrl.auth.split(':');

        dbOptions.name          = dbUrl.path.substring(1);
        dbOptions.user          = authArr[0];
        dbOptions.pass          = authArr[1];
        dbOptions.host          = dbUrl.host;
        dbOptions.port          = null;
        dbOptions.dialect       = 'postgres';
        dbOptions.protocol      = 'postgres';
        break;
}

Impasto.db = new Sequelize(dbOptions.name, dbOptions.user, dbOptions.pass, {
    host: dbOptions.host,
    port: dbOptions.port,
    dialect: dbOptions.dialect,
    protocol: dbOptions.protocol,
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
    assetManager = require('connect-assetmanager'),
    assets = require(__root + '/assets'),
    aseetManagerMiddleware = assetManager(assets),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt');

GLOBAL.passport = require('passport');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done){
        Impasto.Models.User.find({
            where: {emailAddress: email}
        }).success(function(user){
            if(!user){
                return done(null, false, {message: 'Unknown User.'});
            }

            if(password && !bcrypt.compareSync(password, user.password)){
                return done(null, false, {message: 'Incorrect Password.'});
            }

            return done(null, user);
        }).error(function(error){
            return done(error);
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    Impasto.Models.User.find({
        where: {id: id}
    }).success(function(user){
        if(!user){
            return done(null, false, {message: 'Unknown User.'});
        }

        return done(null, user);
    }).error(function(error){
        return done(error);
    });
});

var app = module.exports = express.createServer();

// Setup Associations
require(__root + "/libraries/ModelAssociations");

// Setup ServiceLoader
GLOBAL.ServiceLoader = require(__root + '/libraries/ServiceLoader');

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.use(function(req, res, next){
        // req.cookies = {
        //     'connect.sid': req.headers.sessionkey
        // }
        next();
    });

    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(express.session({
        key: 'i_sess',
        secret: '$2a$10$e48vUJ9hGgsHUj.j2S9Yru'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(aseetManagerMiddleware)
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.dynamicHelpers({
    isAuthenticated: function(req, res){
        return req.isAuthenticated();
    }
})

// Add Underscore.js as view engine
app.register('.html', {
    compile: function(str, options){
        return function(locals){
            return _.template(str, locals, {variable: 'page'});
        };
    }
});

// Routes
require('./routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
