var EventEmitter = require('events').EventEmitter
var m = require('mithril')
var mexport = require('./')
var test = require('tape');

function Dashboard(config){
	var dashboard = new EventEmitter()

	var vm = {}

	dashboard.controller = function() {
	    vm.greeting = "Hello";
	};

	dashboard.view = function(vm) {
		return m("h1", vm.greeting);
	};

	dashboard.appendTo = mexport.module(dashboard)

	return dashboard
}

var container = document.createElement('div')
document.body.appendChild(container)

test('normal mode', function (t) {
	var dashboard = Dashboard({
		test:10
	})
	m.module(container, dashboard);

	t.equal(container.querySelectorAll('h1').length, 1, 'one element rendered')

  t.end()
})