var Util = {};
Util.guid = function() {
    function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
};
Util.clone = function(o){
	return JSON.parse(JSON.stringify(o));
};
module.exports = Util;