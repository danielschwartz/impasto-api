// Main Routes Files

module.exports = function(app){
	app.get('/api/:service/:method', function(req, res, next){
		var service = require(__root + '/services/' + req.params.service);

		service[req.params.method](req, res, function(response){
			console.log(response);
			res.json(response);
		});
	});
}