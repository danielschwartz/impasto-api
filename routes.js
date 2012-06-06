// Main Routes Files
var API = require(__root + '/controllers/API');
var AdminPieceController = require(__root + '/controllers/AdminPieceController');


module.exports = function(app){
    // Admin Routes
    app.get('/admin', function(req, res){
        res.render('index', {
            title: 'Impasto API Homepage'
        });
    });

    app.get('/admin/pieces', AdminPieceController.list)
    app.get('/admin/pices/:id', AdminPieceController.show)

    // API Routes
    app.get('/api/:service/:method', API.get);

    app.get('/dbseed', function(req, res){
        var seeds = require(__root + "/libraries/seed");

        GLOBAL.db.drop();

        GLOBAL.db.sync({force: true}).on('success', function() {
            console.log('MySQL schema created');
            console.log('Creating Seed Data');
            seeds.initUserPieces();
            res.json({success: true});
        }).on('failure', function(error) {
            console.log('MySQL schema cannot be created');
            console.log(error);
            res.json({success: false, error: error});
        });
    });

    app.get('/admin/pieces/:id', AdminPieceController);
}