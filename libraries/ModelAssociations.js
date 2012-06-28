// Get Impasto.Models
module.exports = (function(){
    // Create GLOBAL Impasto.Models object
    Impasto.Models = {};

    Impasto.Models.Address      = Impasto.db.import(__root + "/models/Address");
    Impasto.Models.Collection   = Impasto.db.import(__root + "/models/Collection");
    Impasto.Models.CreditCard   = Impasto.db.import(__root + "/models/CreditCard");
    Impasto.Models.List         = Impasto.db.import(__root + "/models/List");
    Impasto.Models.ListItem     = Impasto.db.import(__root + "/models/ListItem");
    Impasto.Models.Order        = Impasto.db.import(__root + "/models/Order");
    Impasto.Models.Piece        = Impasto.db.import(__root + "/models/Piece");
    Impasto.Models.Rating       = Impasto.db.import(__root + "/models/Rating");
    Impasto.Models.User         = Impasto.db.import(__root + "/models/User");


    // Address Associations
    Impasto.Models.Address.hasMany(Impasto.Models.CreditCard);
    Impasto.Models.Address.hasOne(Impasto.Models.User);
    Impasto.Models.Address.belongsTo(Impasto.Models.User);

    // Collection Associations
    Impasto.Models.Collection.hasMany(Impasto.Models.Piece);

    // Credit Card Associations
    Impasto.Models.CreditCard.hasOne(Impasto.Models.Address);
    Impasto.Models.CreditCard.hasOne(Impasto.Models.User);
    Impasto.Models.CreditCard.belongsTo(Impasto.Models.User);
    Impasto.Models.CreditCard.hasMany(Impasto.Models.Order);

    // Order Associations
    Impasto.Models.Order.hasOne(Impasto.Models.CreditCard);
    Impasto.Models.Order.hasOne(Impasto.Models.User);
    Impasto.Models.Order.belongsTo(Impasto.Models.User);
    Impasto.Models.Order.hasOne(Impasto.Models.Piece);

    // Piece Associations
    Impasto.Models.Piece.hasOne(Impasto.Models.User);
    Impasto.Models.Piece.belongsTo(Impasto.Models.User);
    Impasto.Models.Piece.hasOne(Impasto.Models.Order);
    Impasto.Models.Piece.belongsTo(Impasto.Models.Order);
    Impasto.Models.Piece.hasMany(Impasto.Models.Collection);
    Impasto.Models.Piece.hasMany(Impasto.Models.Rating);

    // Rating Associations
    Impasto.Models.Rating.hasOne(Impasto.Models.User);
    Impasto.Models.Rating.belongsTo(Impasto.Models.User);
    Impasto.Models.Rating.hasOne(Impasto.Models.Piece);

    // User Associations
    Impasto.Models.User.hasMany(Impasto.Models.Piece);
    Impasto.Models.User.hasMany(Impasto.Models.Address);
    Impasto.Models.User.hasMany(Impasto.Models.Order);
    Impasto.Models.User.hasMany(Impasto.Models.CreditCard);
    Impasto.Models.User.hasMany(Impasto.Models.Rating);
})();