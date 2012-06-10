module.exports.createUser = function(req, res, callback){
    if(!req.body.email){
        return callback({
            code: 505,
            options: {
                params: 'email'
            }
        });
    }

    if(!req.body.password){
        return callback({
            code: 505,
            options: {
                params: 'password'
            }
        });
    }

    var email = req.body.email,
        rawPassword = req.body.password,
        bcrypt = require('bcrypt'),
        salt = bcrypt.genSaltSync(10),
        hashedPassword = bcrypt.hashSync(rawPassword, salt);

        Models.User.create({
            emailAddress: email,
            password: hashedPassword
        }).success(function(user){
            callback(user.mapAttributes());
        }).error(function(error){
            callback(true, null);
        });
}

module.exports.getUserByEmail = function(req, res, callback){
    var email = req.query.email;
    if(!email){
        return callback({
            code: 505,
            options: {
                params: 'email'
            }
        });
    }

    Models.User.find({
        where: {email: email}
    }).success(function(user){
        callback(user.mapAttributes());
    }).error(function(error){
        callback(true, null);
    });
}