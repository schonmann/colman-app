import Rest from './rest.js'
var Http = {};
Http.post = function (service, data, callback, fallback) {
    $.ajax({
        url: Rest.url(service),
        type: "post",
        dataType: "json",
        data: data,
        success: function (res) {
            typeof (callback) === 'function' && callback(res);
        },
        error: function (x, status, error) {
            typeof (fallback) === 'function' && fallback(XMLHttpRequest,status,error);
        }
    });
};
Http.get = function (service, callback, fallback) {
    $.ajax({
        url: Rest.url(service),
        type: "get",
        dataType: "json",
        success: function (res) {
            typeof (callback) === 'function' && callback(res);
        },
        error: function (x, status, error) {
            typeof (fallback) === 'function' && fallback(x,status,error);
        }
    });
};
Http.delete = function (service, data, callback, fallback) {
    $.ajax({
        url: Rest.url(service),
        type: "delete",
        dataType: "json",
        success: function (res) {
            typeof (callback) === 'function' && callback(res);
        },
        error: function (x, status, error) {
            typeof (fallback) === 'function' && fallback(x,status,error);
        }
    });
};
module.exports = Http;