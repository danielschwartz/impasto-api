/*
 *	User Model
 *	@db: sequelize adapter
 *	@DataTypes: Sequelize DataTypes
 *
 *	@return SequelizeModel
 */

module.exports = function(db, DataTypes){
	return db.define('User', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
		},
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		emailAddress: DataTypes.STRING,
		password: DataTypes.TEXT,
		brithDate: DataTypes.DATE,
		gender: DataTypes.STRING,
		partition: DataTypes.INTEGER,
		fbUserId: DataTypes.INTEGER,
		isCurator: DataTypes.BOOLEAN,
		isArtist: DataTypes.BOOLEAN,
		isAdmin: DataTypes.BOOLEAN,
		artistHometown: DataTypes.STRING,
		artistCurrentCity: DataTypes.STRING,
		artistUrl: DataTypes.TEXT,
		artistEducation: DataTypes.TEXT,
		artistBio: DataTypes.TEXT,
		aristMainStyle: DataTypes.STRING,
		artistMainMedium: DataTypes.STRING,
		artistImage: DataTypes.TEXT,
		artistThumb: DataTypes.TEXT,
		published: DataTypes.BOOLEAN
	}, {
		// options
	})
}