// Get Models
module.exports = (function(){
	// Create GLOBAL Models object
	GLOBAL.Models = {};

	GLOBAL.Models.Address 			= GLOBAL.db.import(GLOBAL.__root + "/models/Address");
	GLOBAL.Models.Collection 		= GLOBAL.db.import(GLOBAL.__root + "/models/Collection");
	GLOBAL.Models.CreditCard 		= GLOBAL.db.import(GLOBAL.__root + "/models/CreditCard");
	GLOBAL.Models.List 				= GLOBAL.db.import(GLOBAL.__root + "/models/List");
	GLOBAL.Models.ListItem 			= GLOBAL.db.import(GLOBAL.__root + "/models/ListItem");
	GLOBAL.Models.Order 			= GLOBAL.db.import(GLOBAL.__root + "/models/Order");
	GLOBAL.Models.Piece 			= GLOBAL.db.import(GLOBAL.__root + "/models/Piece");
	GLOBAL.Models.Rating 			= GLOBAL.db.import(GLOBAL.__root + "/models/Rating");
	GLOBAL.Models.User 				= GLOBAL.db.import(GLOBAL.__root + "/models/User");


	// Address Associations
	GLOBAL.Models.Address.hasMany(GLOBAL.Models.CreditCard);
	GLOBAL.Models.Address.hasOne(GLOBAL.Models.User);
	GLOBAL.Models.Address.belongsTo(GLOBAL.Models.User);

	// Collection Associations
	GLOBAL.Models.Collection.hasMany(GLOBAL.Models.Piece);

	// Credit Card Associations
	GLOBAL.Models.CreditCard.hasOne(GLOBAL.Models.Address);
	GLOBAL.Models.CreditCard.hasOne(GLOBAL.Models.User);
	GLOBAL.Models.CreditCard.belongsTo(GLOBAL.Models.User);
	GLOBAL.Models.CreditCard.hasMany(GLOBAL.Models.Order);

	// Order Associations
	GLOBAL.Models.Order.hasOne(GLOBAL.Models.CreditCard);
	GLOBAL.Models.Order.hasOne(GLOBAL.Models.User);
	GLOBAL.Models.Order.belongsTo(GLOBAL.Models.User);
	GLOBAL.Models.Order.hasOne(GLOBAL.Models.Piece);

	// Piece Associations
	GLOBAL.Models.Piece.hasOne(GLOBAL.Models.User);
	GLOBAL.Models.Piece.belongsTo(GLOBAL.Models.User);
	GLOBAL.Models.Piece.hasOne(GLOBAL.Models.Order);
	GLOBAL.Models.Piece.belongsTo(GLOBAL.Models.Order);
	GLOBAL.Models.Piece.hasMany(GLOBAL.Models.Collection);
	GLOBAL.Models.Piece.hasMany(GLOBAL.Models.Rating);

	// Rating Associations
	GLOBAL.Models.Rating.hasOne(GLOBAL.Models.User);
	GLOBAL.Models.Rating.belongsTo(GLOBAL.Models.User);
	GLOBAL.Models.Rating.hasOne(GLOBAL.Models.Piece);

	// User Associations
	GLOBAL.Models.User.hasMany(GLOBAL.Models.Piece);
	GLOBAL.Models.User.hasMany(GLOBAL.Models.Address);
	GLOBAL.Models.User.hasMany(GLOBAL.Models.Order);
	GLOBAL.Models.User.hasMany(GLOBAL.Models.CreditCard);
	GLOBAL.Models.User.hasMany(GLOBAL.Models.Rating);
})();