module.exports.createUser = function(req, res, callback){
    
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