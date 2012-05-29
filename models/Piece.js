/*
 *  Piece Model
 *  @db: sequelize adapter
 *  @DataTypes: Sequelize DataTypes
 *
 *  @return SequelizeModel
 */

module.exports = function(db, DataTypes){
    return db.define('Piece', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        title: DataTypes.TEXT,
        medium: DataTypes.STRING,
        style: DataTypes.STRING,
        dimensions: DataTypes.STRING,
        description: DataTypes.TEXT,
        completionDate: DataTypes.DATE,
        shippingWindow: DataTypes.TEXT,
        weight: DataTypes.TEXT,
        quantity: DataTypes.INTEGER,
        quantitySold: DataTypes.INTEGER,
        image: DataTypes.TEXT,
        thumbnail: DataTypes.TEXT,
        editorialReview: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        published: DataTypes.BOOLEAN,
        soldOut: DataTypes.BOOLEAN
    }, {
        // options
    })
}