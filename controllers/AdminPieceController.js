module.exports.list = function (req, res){
    if(!req.isAuthenticated()){
        res.redirect('/admin/login');
    }


    var pieceService = ServiceLoader.get('PieceService');

    pieceService.getAllPieces(req, res, function(pieces){
        res.render('admin/pieces/list', {
            pieces: pieces
        });
    });
}

module.exports.show = function(req, res){
    if(!req.isAuthenticated()){
        res.redirect('/admin/login');
    }
    var pieceService = ServiceLoader.get('PieceService');
    req.query.id = req.params.id;

    pieceService.getPieceById(req, res, function(piece){

        res.render('admin/pieces/show', {
            piece: piece
        });
    });
}