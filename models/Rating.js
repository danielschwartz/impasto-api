/*
 *	Rating Model
 *	@db: sequelize adapter
 *	@DataTypes: Sequelize DataTypes
 *
 *	@return SequelizeModel
 */

module.exports = function(db, DataTypes){
	return db.define('Rating', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
		},
		rating: DataTypes.FLOAT
	}, {
		// options
	})
}