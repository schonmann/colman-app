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
    'getPeople': 'api/person/all',
    'startLoan': 'api/loan/start',
    'endLoan': 'api/loan/end',
    'getLoansByItem': 'api/loan/byItem',
    'insertPlace': 'api/place/insert',
    'insertPerson': 'api/person/insert'
};
Rest.url = function(service,params){
    return protocol + "://" + ip + ":" + port + "/" + rest[service] + (params ? "/" + params : "");
};

module.exports = Rest;