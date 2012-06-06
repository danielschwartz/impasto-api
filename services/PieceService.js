module.exports.getAllPieces = function(req, res, callback){
    Models.Piece.findAll().success(function(rawPieces){
        var pieces = [];

        _.each(rawPieces, function(piece){
            pieces.push(piece.mapAttributes());
        });


        callback(pieces);
    }).error(function(error){
        ErrorResponder(res);
    })
}

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
        var pieceMemory = Memory.get(cKey);
        if(pieceMemory){
            callback(pieceMemory.mapAttributes());
        } else {
            Models.Piece.find(pieceId).success(function(piece){
                Memory.put(cKey, piece, 5 * 1000); //5 minutes
                callback(piece.mapAttributes());
            }).error(function(error){
                ErrorResponder(res);
            });
        }
    }
}

module.exports.updatePiece = function(req, res, callback){
    var piece = req.query.piece;

    if(!piece){
        ErrorResponder(res, 505, {
            params: 'piece'
        });
    }

    try{
        var piece = JSON.parse(piece);
    } catch(e) {
        ErrorResponder(res, 506);
    }

    Models.Piece.find(piece.id).success(function(rawPiece){
        _.each(piece, function(value, key){
            rawPiece[key] = value;
        });

        var validationErrors = rawPiece.validate();
        if(!validationErrors){
            rawPiece.save().success(function(rawPiece){
                callback(rawPiece.mapAttributes());
            }).error(function(){
                ErrorResponder(res);
            });
        } else {
            ErrorResponder(res, 507, {
                errors: validationErrors
            });
        }
    }).error(function(error){
        ErrorResponder(res);
    });


}