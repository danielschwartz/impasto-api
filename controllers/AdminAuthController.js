module.exports.get = function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/admin/pieces');
    } else {
        res.render('admin/auth/login', {
            bodyId: 'login'
        });
    }
}

module.exports.post = function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err) return ErrorResponder(res);
        if(!user){
            var userService = ServiceLoader.get('UserService');

            userService.createUser(req, res, function(err, user){
                if(err) return ErrorResponder(res);

                passport.authenticate('local', function(err, user, info){
                    if(err) return ErrorResponder(res);
                    if(!user) return ErrorResponder(res);
                    req.logIn(user, function(err){
                        if(err) return ErrorResponder(res);
                        return DataResponder(res, {
                            sessionId: req.sessionID
                        });
                    });
                })(req, res, next);
            });
        } else {
            req.logIn(user, function(err){
                if(err) return ErrorResponder(res);
                return DataResponder(res, {
                    sessionId: req.sessionID
                });
            });
        }
    })(req, res, next);
}