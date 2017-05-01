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
        error: function (XMLHttpRequest, status, error) {
            typeof (fallback) === 'function' && fallback(error);
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
        error: function (XMLHttpRequest, status, error) {
            typeof (fallback) === 'function' && fallback(error);
        }
    });
};
Http.delete = function (url, data, callback, fallback) {
};
module.exports = Http;