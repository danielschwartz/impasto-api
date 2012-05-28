var fs = require('fs');

module.exports.get = function(serviceName){
	try{
		var service = require(__root + '/services/' + serviceName);
		return service;
	} catch(e) {
		return null;
	}
}