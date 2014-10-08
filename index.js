var m = require('mithril')
module.exports = function(mod){
	return function(elem){
		m.module(elem, mod)
	}
}
module.exports.render = function(mod){
	return function(elem){
		m.render(elem, mod)
	}
}