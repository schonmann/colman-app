var Rest = {};
var protocol = "http"
var ip = "localhost";
var port = "58438";
var rest = {
    'getAllItems': 'api/item/all',
    'insertItem': 'api/item/insert',
    'getAllTypes': 'api/info/types/all',
    'getAllPlaces': 'api/place/all',
    'deleteItem': 'api/item/delete',
    'getAllPerson': 'api/person/all',
    'startLoan': 'api/loan/start',
    'endLoan': 'api/loan/end',
    'getLoansByItem': 'api/loan/byItem',
    'insertPlace': 'api/place/insert',
    'insertPerson': 'api/person/insert',
    'getByFilter': 'api/item/getByFilter',
};
Rest.url = function(service,params){
    return protocol + "://" + ip + ":" + port + "/" + rest[service] + (params ? "/" + params : "");
};

module.exports = Rest;