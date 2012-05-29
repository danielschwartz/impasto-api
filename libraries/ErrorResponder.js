module.exports = function(res, type, options){
	var response = {
		success: false,
		error: {}
	};

	options = options || {};

	if(typeof type === 'object'){
		response.error = type;
	} else {
		response.error.code = type;
		response.error.message = errorCodeToMessage(type, options);

	}

	res.json(response);
}

function errorCodeToMessage(code, options){
	if(options.messageOverride){
		return options.messageOverride;
	}

	var message = '';

	switch(code){
		case 501:
			message = 'Unknown Service';
			break;
		case 504:
			message = 'Found service, unknown method';
			break;
		case 505:
			message = 'Missing required parameter/s: ' + options.params;
			break;
		case 506:
			message = '';
			break;
		case 507:
			message = '';
			break;
		default:
			message = 'An internal error has occured';
	}

	return message;
}