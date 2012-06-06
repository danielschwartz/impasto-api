var LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(new LocalStrategy(
        function(email, password, done){
            Models.User.find({
                where: {email: email}
            }).success(function(user){
                if(!user){
                    done(null, false, {message: 'Unknown User.'});
                }

                if(!bcrypt.compareSync(password, user.password)){
                    return done(null, false, {message: 'Incorrect Password.'});
                }

                return done(null, user);
            }).error(function(error){
                return done(error);
            });
        }
    ));

    return passport;
}