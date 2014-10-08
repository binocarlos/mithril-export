var EventEmitter = require('events').EventEmitter
var m = require('mithril')
var mexport = require('./')

function Dashboard(config){
	var dashboard = new EventEmitter()

	var vm = {
		val:config.test
	}

	dashboard.onunload = function() {
		console.log("unloading module 1");
  };

	dashboard.controller = function() {
	    vm.greeting = "Hello";
	};

	dashboard.view = function(ctx) {
		return m("h1", vm.val);
	};

	dashboard.render = mexport(dashboard)

	dashboard.update = function(val){
		vm.val = val
	}

	return dashboard
}

var container1 = document.createElement('div')
var container2 = document.createElement('div')
document.body.appendChild(container1)
document.body.appendChild(container2)

var dashboard1 = Dashboard({
	test:'apple'
})

var dashboard2 = Dashboard({
	test:'orange'
})

m.startComputation()
m.module(container1, dashboard1);
dashboard2.appendTo(container2)
m.endComputation()