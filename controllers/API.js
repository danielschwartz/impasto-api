module.exports.get = function(req, res){
	var service = ServiceLoader.get(req.params.service);

	if(service){
		if(service[req.params.method]){
			service[req.params.method](req, res, function(response){
				res.json(response);
			});
		} else {
			res.json(generateError('method'));
		}
	} else {
		res.json(generateError('service'));
	}
}

function generateError(type){
	var response = {
		success: false,
		error: {}
	};

	switch(type){
		case 'service':
			response.error.code = 404;
			response.error.message = 'Unknown service';
			break;
		case 'method':
			response.error.code = 404;
			response.error.message = 'Found service, but unknown method';
			break;
		default:
			response.error.code = 500;
			response.error.message = "An internal error has occured";
			break;
	}

	return response;
}