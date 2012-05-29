module.exports.getPieceById = function(req, res, callback){
	var pieceId = req.query.id ? parseInt(req.query.id) : null;

	if(!pieceId){
		ErrorResponder(res, 505, {
			params: 'id'
		});
	} else {
		Models.Piece.find(pieceId).success(function(piece){
			callback(piece.mapAttributes());
		}).error(function(error){
			callback({})
		});
	}
}