module.exports.getAllPieces = function(req, res, callback){
    Impasto.Models.Piece.findAll().success(function(rawPieces){
        if(!rawPieces){
            return callback(true, null);
        }

        var pieces = [];

        _.each(rawPieces, function(piece){
            pieces.push(piece.mapAttributes());
        });


        callback(null, pieces);
    }).error(function(error){
        callback(true, null);
    })
}

module.exports.getPieceById = function(req, res, callback){
    var pieceId = req.query.id ? parseInt(req.query.id) : null;

    if(!pieceId){
        return callback({
            code: 505,
            options: {
                params: 'id'
            }
        });
    }

    // cacheKey
    var cKey = 'piece_' + pieceId;

    // try and get it from cache
    var pieceMemory = Impasto.Memory.get(cKey);
    if(pieceMemory){
        return callback(null, pieceMemory.mapAttributes());
    }

    Impasto.Models.Piece.find(pieceId).success(function(piece){
        if(!piece){
            return callback(true, null);
        }

        Impasto.Memory.put(cKey, piece, 5 * 1000); //5 minutes
        callback(null, piece.mapAttributes());
    }).error(function(error){
        callback(true, null);
    });

}

module.exports.updatePiece = function(req, res, callback){
    var piece = req.query.piece;

    if(!piece){
        return callback({
            code: 505,
            options: {
                params: 'piece'
            }
        });
    }

    try{
        var piece = JSON.parse(piece);
    } catch(e) {
       return callback({
            code: 506
        });
    }

    Impasto.Models.Piece.find(piece.id).success(function(rawPiece){
        if(!rawPiece){
            return callback(true, null);
        }

        _.each(piece, function(value, key){
            rawPiece[key] = value;
        });

        var validationErrors = rawPiece.validate();

        if(validationErrors){
            return callback({
                code: 507,
                options: {
                    errors: validationErrors
                }
            });
        }

        rawPiece.save().success(function(rawPiece){
            callback(null, rawPiece.mapAttributes());
        }).error(function(){
            callback(true, null);
        });        
    }).error(function(error){
        callback(true, null);
    });
    
}