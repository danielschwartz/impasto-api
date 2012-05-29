module.exports = function(res, data){
	var response = {
		success: true,
		data: {}
	};

	response.data = data;

	res.json(response);
}