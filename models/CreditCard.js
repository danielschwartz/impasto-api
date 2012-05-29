/*
 *  CreditCard Model
 *  @db: sequelize adapter
 *  @DataTypes: Sequelize DataTypes
 *
 *  @return SequelizeModel
 */

module.exports = function(db, DataTypes){
    return db.define('CreditCard', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        type: DataTypes.STRING,
        cvn: DataTypes.INTEGER,
        lastFour: DataTypes.INTEGER,
        stripeUserToken: DataTypes.TEXT,
        expirationDate: DataTypes.DATE,
        fullName: DataTypes.TEXT
    }, {
        // options
    })
}