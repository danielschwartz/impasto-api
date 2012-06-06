module.exports.getPieceById = function(req, res, callback){
    var pieceId = req.query.id ? parseInt(req.query.id) : null;

    if(!pieceId){
        ErrorResponder(res, 505, {
            params: 'id'
        });
    } else {
        // cacheKey
        var cKey = 'piece_' + pieceId;

        // try and get it from cache
        if(pieceMemory = Memory.get(cKey)){
            callback(pieceMemory.mapAttributes());
        } else {
            Models.Piece.find(pieceId).success(function(piece){
                Memory.put(cKey, piece, 5 * 1000); //5 minutes
                callback(piece.mapAttributes());
            }).error(function(error){
                callback({})
            });
        }
    }
}

module.exports.getAllPieces = function(req, res, callback){
    Models.Piece.findAll().success(function(rawPieces){
        var pieces = [];

        _.each(rawPieces, function(piece){
            pieces.push(piece.mapAttributes());
        });


        callback(pieces);
    }).error(function(error){
        callback({});
    })
}