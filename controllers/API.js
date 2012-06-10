module.exports.get = module.exports.post = function(req, res){
    var service = ServiceLoader.get(req.params.service);

    if(service){
        if(service[req.params.method]){
            service[req.params.method](req, res, function(err, response){
                if(err){
                    ErrorResponder(res, err.code, err.options);
                } else {
                    DataResponder(res, response);
                }
            });
        } else {
            ErrorResponder(res, 504);
        }
    } else {
        ErrorResponder(res, 501);
    }
}