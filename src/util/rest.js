var Rest = {};
var protocol = "http"
var ip = "localhost";
var port = "58438";
var rest = {
    'getAllItems': 'api/item/all',
    'insertItem': 'api/item/insert',
    'getTypes': 'api/info/types/all',
    'getPlaces': 'api/place/all',
    'deleteItem': 'api/item/delete',
};
Rest.url = function(service){
    return protocol + "://" + ip + ":" + port + "/" + rest[service];
};
module.exports = Rest;