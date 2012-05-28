/*
 *	Collection Model
 *	@db: sequelize adapter
 *	@DataTypes: Sequelize DataTypes
 *
 *	@return SequelizeModel
 */

module.exports = function(db, DataTypes){
	return db.define('Collection', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
		},
		type: DataTypes.STRING,
		title: DataTypes.TEXT,
		subtitle: DataTypes.TEXT,
		description: DataTypes.TEXT,
		image: DataTypes.TEXT,
		thumb: DataTypes.TEXT,
		order: DataTypes.TEXT,
		published: DataTypes.BOOLEAN
	}, {
		// options
	})
}