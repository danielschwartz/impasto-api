/*
 *  Address Model
 *  @db: sequelize adapter
 *  @DataTypes: Sequelize DataTypes
 *
 *  @return SequelizeModel
 */

module.exports = function(db, DataTypes){
    return db.define('Address', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
            allowNull: false
        },
        title: DataTypes.STRING,
        fullName: DataTypes.TEXT,
        addressLine1: DataTypes.TEXT,
        addressLine2: DataTypes.TEXT,
        city: DataTypes.TEXT,
        state: DataTypes.TEXT,
        zip: DataTypes.STRING,
        country: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
    }, {
        // options
    })
}