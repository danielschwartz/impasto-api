// Main Routes Files
var API = require(__root + '/controllers/API')
    AdminPieceController = require(__root + '/controllers/AdminPieceController'),
    AdminAuthController = require(__root + '/controllers/AdminAuthController');


module.exports = function(app){
    // Admin Routes
    app.get('/admin', function(req, res){
        res.render('index', {
            title: 'Impasto API Homepage'
        });
    });

    app.get('/admin/pieces', AdminPieceController.list);
    app.get('/admin/pieces/:id', AdminPieceController.show);

    // API Routes
    app.get('/api/:service/:method', API.get);
    app.get('/api/:service/:method', API.post);

    app.get('/dbseed', function(req, res){
        var seeds = require(__root + "/libraries/seed");

        Impasto.db.drop();

        Impasto.db.sync({force: true}).on('success', function() {
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

    app.get('/admin/login', AdminAuthController.get);
    app.post('/auth/login', AdminAuthController.post);
    app.get('/admin/logout', function(req, res){
        req.logout();
        res.redirect('/admin');
    });

    app.post('/login', function(req, res, next){
        passport.authenticate('local', function(err, user, info){
            if(err) return Impasto.ErrorResponder(res);
            if(!user) return Impasto.ErrorResponder(res);
            req.logIn(user, function(err){
                if(err) return Impasto.ErrorResponder(res);
                return Impasto.DataResponder(res, {
                    sessionId: req.sessionID
                });
            });
        })(req, res, next);
    });

    app.get('/mu-bf7317e0-4ab0d534-52c40d5b-bf8a7b7a', function(req, res){
        res.send('42');
    });

    app.get('/admin/pieces/:id', AdminPieceController);
}