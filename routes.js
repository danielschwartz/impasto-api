// Main Routes Files
var API = require(__root + '/controllers/API');


module.exports = function(app){
	app.get('/api/:service/:method', API.get);
}