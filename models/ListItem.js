/*
 *	ListItem Model
 *	@db: sequelize adapter
 *	@DataTypes: Sequelize DataTypes
 *
 *	@return SequelizeModel
 */

module.exports = function(db, DataTypes){
	return db.define('ListItem', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
		},
		pieceId: DataTypes.INTEGER,
		note: DataTypes.TEXT
	}, {
		// options
	})
}