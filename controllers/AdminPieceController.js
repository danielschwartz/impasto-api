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