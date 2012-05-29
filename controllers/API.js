module.exports.get = function(req, res){
    var service = ServiceLoader.get(req.params.service);

    if(service){
        if(service[req.params.method]){
            service[req.params.method](req, res, function(response){
                DataResponder(res, response);
            });
        } else {
            ErrorResponder(res, 504);
        }
    } else {
        ErrorResponder(res, 501);
    }
}