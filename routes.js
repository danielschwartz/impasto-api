// Main Routes Files
var API = require(__root + '/controllers/API')
    AdminPieceController = require(__root + '/controllers/AdminPieceController'),
    AdminAuthController = require(__root + '/controllers/AdminAuthController'),
    cloudinary = require('cloudinary');

cloudinary.config('cloud_name', 'impasto');
cloudinary.config('api_key', '728766864892916');
cloudinary.config('api_secret', 'Sy7QKX3AwpzUaVql39uzWhtyXhI');


module.exports = function(app){
    // Admin Routes
    app.get('/admin', function(req, res){
        res.render('index', {
            title: 'Impasto API Homepage'
        });
    });

    app.get('/admin/pieces', AdminPieceController.list);
    app.get('/admin/pieces/:id', AdminPieceController.show);
    app.get('/admin/piece/new', AdminPieceController['new']);
    app.post('/admin/piece/create', AdminPieceController.create);

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

    app.get('/cloudinary-test', function(req, res){
        // cloudinary.uploader.upload(__root + '/public/images/glyphicons-halflings.png', function(result){
        //     res.json(result);
        // });

        res.send(cloudinary.url('vitihhpjmlrexwpyllvqda', {
            format: "png",
            width: 100,
            height: 100,
            crop: 'fill'
        }));
    });

    app.get('/mu-bf7317e0-4ab0d534-52c40d5b-bf8a7b7a', function(req, res){
        res.send('42');
    });

    app.get('/admin/pieces/:id', AdminPieceController);
}