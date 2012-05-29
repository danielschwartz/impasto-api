/*
 *  Order Model
 *  @db: sequelize adapter
 *  @DataTypes: Sequelize DataTypes
 *
 *  @return SequelizeModel
 */

module.exports = function(db, DataTypes){
    return db.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        subtotal: DataTypes.FLOAT,
        taxes: DataTypes.FLOAT,
        fees: DataTypes.FLOAT,
        total: DataTypes.FLOAT,
        shippingFees: DataTypes.FLOAT,
        shippingNotes: DataTypes.TEXT,
        framingFees: DataTypes.FLOAT,
        framingNotes: DataTypes.TEXT,
        insuranceFees: DataTypes.FLOAT,
        insuranceNotes: DataTypes.TEXT,
        orderNotes: DataTypes.TEXT,
        phoneNumber: DataTypes.STRING,
        orderEmailSent: DataTypes.BOOLEAN,
        shippingEmailSent: DataTypes.BOOLEAN,
        isGift: DataTypes.BOOLEAN,
        cancelled: DataTypes.BOOLEAN,
        trackingNumber: DataTypes.STRING
    }, {
        // options
    })
}