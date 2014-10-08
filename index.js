var m = require('mithril')
module.exports = {
	module:function(mod){
		return function(elem){
			m.module(elem, mod)
		}
	},
	render:function(mod){
		return function(elem){
			m.render(elem, mod)
		}
	}
}