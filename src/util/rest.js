var Rest = {};
var protocol = "http"
var ip = "localhost";
var port = "58438";
var rest = {
    'getAllItems': 'api/item/all',
    'insertItem': 'api/item/insert',
    'getTypes_pt-br': 'api/info/types/pt-br',
    'getTypes_en-us': 'api/info/types/en-us',
    'getPlaces': "api/place/all"
};
Rest.url = function(service){
    return protocol + "://" + ip + ":" + port + "/" + rest[service];
};
module.exports = Rest;