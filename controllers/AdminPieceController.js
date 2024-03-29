module.exports.list = function (req, res){
    if(!req.isAuthenticated()){
        res.redirect('/admin/login');
    } else {
        var pieceService = ServiceLoader.get('PieceService');

        pieceService.getAllPieces(req, res, function(err, pieces){
            res.render('admin/pieces/list', {
                pieces: pieces
            });
        });
    }
}

module.exports.show = function(req, res){
    if(!req.isAuthenticated()){
        res.redirect('/admin/login');
    } else {
        var pieceService = ServiceLoader.get('PieceService');
        req.query.id = req.params.id;

        pieceService.getPieceById(req, res, function(err, piece){
            res.render('admin/pieces/show', {
                piece: piece
            });
        });
    }
}

module.exports.new = function(req, res){
    res.render('admin/pieces/new');
}

module.exports.create = function(req, res){
    var fs = require('fs');

    cloudinary.uploader.upload(req.files.upload.path, function(result){
        fs.unlink(req.files.upload.path, function(err){
            res.json(result);
        });
    });
}