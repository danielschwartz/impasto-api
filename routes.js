// Main Routes Files
var API = require(__root + '/controllers/API');


module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index', {
            title: 'Impasto API Homepage'
        });
    });

    app.get('/api/:service/:method', API.get);

    app.get('/dbseed', function(req, res){
        var seeds = require(__root + "/libraries/seed");

        GLOBAL.db.sync({force: true}).on('success', function() {
            console.log('MySQL schema created');
            console.log('Creating Seed Data');
            seeds.initUserPieces();
            res.json({success: true});
        }).on('failure', function(error) {
            console.log('MySQL schema cannot be created');
            Logger.error(error);
            res.json({success: false, error: error});
        });
    });
}