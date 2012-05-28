module.exports.getPieceById = function(req, res, callback){
	var pieceId = parseInt(req.query.id);

	Models.Piece.find(pieceId).success(function(piece){
		callback(piece.mapAttributes());
	}).error(function(error){
		callback({})
	});
}