/*
 *	List Model
 *	@db: sequelize adapter
 *	@DataTypes: Sequelize DataTypes
 *
 *	@return SequelizeModel
 */

module.exports = function(db, DataTypes){
	return db.define('List', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
		},
		type: DataTypes.INTEGER,
		title: DataTypes.STRING,
		subtitle: DataTypes.STRING
	}, {
		// options
	})
}