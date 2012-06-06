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
            primaryKey: true,
            validate: {
                notNull: true,
                isInt: true
            }
        },
        title: {
            type: DataTypes.TEXT,
            validate: {
                isAlphanumeric: true,
                notNull: true,
                notEmpty: true,
                len: [3, 255],
            }
        },
        medium: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        style: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        height: {
            type: DataTypes.FLOAT,
            validate: {
                isNumeric: true,
                notNull: true
            }
        },
        width: {
            type: DataTypes.FLOAT,
            validate: {
                isNumeric: true,
                notNull: true
            }
        },
        depth: {
            type: DataTypes.FLOAT,
            validate: {
                isNumeric: true,
                notNull: true
            }
        },
        description: DataTypes.TEXT,
        completionDate: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        },
        shippingWindow: DataTypes.TEXT,
        weight: {
            type: DataTypes.FLOAT,
            validate: {
                isNumeric: true,
                notNull: true
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true,
                notNull: true
            }
        },
        quantitySold: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true,
                notNull: true
            }
        },
        image: DataTypes.TEXT,
        thumbnail: DataTypes.TEXT,
        editorialReview: DataTypes.TEXT,
        price: {
            type: DataTypes.FLOAT,
            validate: {
                isNumeric: true,
                notNull: true
            }
        },
        published: DataTypes.BOOLEAN,
    }, {
        paranoid: true
    })
}