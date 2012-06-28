module.exports.get = module.exports.post = function(req, res){
    var service = ServiceLoader.get(req.params.service);

    if(service){
        if(service[req.params.method]){
            service[req.params.method](req, res, function(err, response){
                if(err){
                    Impasto.ErrorResponder(res, err.code, err.options);
                } else {
                    Impasto.DataResponder(res, response);
                }
            });
        } else {
            Impasto.ErrorResponder(res, 504);
        }
    } else {
        Impasto.ErrorResponder(res, 501);
    }
}