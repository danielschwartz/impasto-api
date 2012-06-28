var Faker = require('Faker');

module.exports = {
    initUserPieces: function(){
        for (var i = 0; i < 100; i++) {
            Impasto.Models.User.create({
                firstName: Faker.Name.firstName(),
                lastName: Faker.Name.lastName(),
                emailAddress: Faker.Internet.email(),
                gender: 'M'
            }).success(function(user){
                Impasto.Models.Piece.create({
                    title: Faker.Lorem.sentences(),
                    medium: Faker.Lorem.sentences(),
                    style: Faker.Lorem.sentences(),
                    description: Faker.Lorem.sentences()
                }).success(function(piece){
                    user.addPiece(piece);
                    piece.setUser(user);
                }).error(function(error){
                    console.log(error.message);
                });
            }).error(function(error){
                console.log(error.message);
            }); 
        };
    }
}