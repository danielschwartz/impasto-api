// Get Models
module.exports = (function(){
	// Create GLOBAL Models object
	GLOBAL.Models = {};

	Models.Address 		= GLOBAL.db.import(__root + "/models/Address");
	Models.Collection 	= GLOBAL.db.import(__root + "/models/Collection");
	Models.CreditCard 	= GLOBAL.db.import(__root + "/models/CreditCard");
	Models.List 		= GLOBAL.db.import(__root + "/models/List");
	Models.ListItem 	= GLOBAL.db.import(__root + "/models/ListItem");
	Models.Order 		= GLOBAL.db.import(__root + "/models/Order");
	Models.Piece 		= GLOBAL.db.import(__root + "/models/Piece");
	Models.Rating 		= GLOBAL.db.import(__root + "/models/Rating");
	Models.User 		= GLOBAL.db.import(__root + "/models/User");


	// Address Associations
	Models.Address.hasMany(Models.CreditCard);
	Models.Address.hasOne(Models.User);
	Models.Address.belongsTo(Models.User);

	// Collection Associations
	Models.Collection.hasMany(Models.Piece);

	// Credit Card Associations
	Models.CreditCard.hasOne(Models.Address);
	Models.CreditCard.hasOne(Models.User);
	Models.CreditCard.belongsTo(Models.User);
	Models.CreditCard.hasMany(Models.Order);

	// Order Associations
	Models.Order.hasOne(Models.CreditCard);
	Models.Order.hasOne(Models.User);
	Models.Order.belongsTo(Models.User);
	Models.Order.hasOne(Models.Piece);

	// Piece Associations
	Models.Piece.hasOne(Models.User);
	Models.Piece.belongsTo(Models.User);
	Models.Piece.hasOne(Models.Order);
	Models.Piece.belongsTo(Models.Order);
	Models.Piece.hasMany(Models.Collection);
	Models.Piece.hasMany(Models.Rating);

	// Rating Associations
	Models.Rating.hasOne(Models.User);
	Models.Rating.belongsTo(Models.User);
	Models.Rating.hasOne(Models.Piece);

	// User Associations
	Models.User.hasMany(Models.Piece);
	Models.User.hasMany(Models.Address);
	Models.User.hasMany(Models.Order);
	Models.User.hasMany(Models.CreditCard);
	Models.User.hasMany(Models.Rating);
})();