module.exports = function(req, res){
    var pieceService = ServiceLoader.get('PieceService');
    req.query.id = req.params.id;

    pieceService.getPieceById(req, res, function(piece){

        res.render('admin/piece', {
            piece: piece
        });
    });
}