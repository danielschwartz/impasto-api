module.exports.createUser = function(req, res, callback){
    if(!req.body.email){
        ErrorResponder(res, 505, {
            params: 'email'
        });
    }

    if(!req.body.password){
        ErrorResponder(res, 505, {
            params: 'password'
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
            ErrorResponder(error);
        });
}

module.exports.getUserByEmail = function(req, res, callback){
    var email = req.query.email;
    if(!email){
        ErrorResponder(res, 505, {
            params: 'email'
        });
    }

    Models.User.find({
        where: {email: email}
    }).success(function(user){
        callback(user.mapAttributes());
    }).error(function(error){
        ErrorResponder(res);
    });
}