var EventEmitter = require('events').EventEmitter
var m = require('mithril')
var mexport = require('./')
var test = require('tape');

function Dashboard(config){
	var dashboard = {}

	dashboard.controller = function() {
		this.val = config.test
	};

	dashboard.view = function(ctx) {
		return m("h1", ctx.val);
	};

	dashboard.appendTo = mexport(dashboard)

	return dashboard
}

test('normal mode', function (t) {

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
	
	t.equal(container1.querySelectorAll('h1').length, 1, 'one element rendered')
	t.equal(container2.querySelectorAll('h1').length, 1, 'one element rendered')
	t.equal(container1.querySelectorAll('h1')[0].innerHTML, 'apple', 'apple val')
	t.end()

  
})
