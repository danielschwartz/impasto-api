// module.exports = function(req, res){
    // var pieceService = ServiceLoader.get('PieceService');
    // req.query.id = req.params.id;

    // pieceService.getPieceById(req, res, function(piece){

    //     res.render('admin/piece', {
    //         piece: piece
    //     });
    // });
// }

module.exports.list = function (req, res){
    var pieceService = ServiceLoader.get('PieceService');
    req.query.id = 1;

    pieceService.getPieceById(req, res, function(piece){

        res.render('admin/pieces/list', {
            piece: piece
        });
    });
}

module.exports.show = function(req, res){
    var pieceService = ServiceLoader.get('PieceService');
    req.query.id = req.params.id;

    pieceService.getPieceById(req, res, function(piece){

        res.render('admin/pieces/show', {
            piece: piece
        });
    });
}