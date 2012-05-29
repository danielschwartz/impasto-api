module.exports.getPieceById = function(req, res, callback){
    var pieceId = req.query.id ? parseInt(req.query.id) : null;

    if(!pieceId){
        ErrorResponder(res, 505, {
            params: 'id'
        });
    } else {
        var pieceMemory = Memory.get('piece_' + pieceId);

        if(pieceMemory){
            callback(pieceMemory.mapAttributes());
        } else {
            Models.Piece.find(pieceId).success(function(piece){
                var pieceJson = piece.mapAttributes();
                Memory.put('piece_' + pieceJson.id, piece);
                callback(pieceJson);
            }).error(function(error){
                callback({})
            });
        }
    }
}