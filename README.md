mithril-export
==============

Append self contained [mithril](https://github.com/lhorie/mithril.js) views to normal DOM elements

## install

```
$ npm install mithril-export --save
```

## usage without

Take this simple mithril module that is to be packaged with [browserify](https://github.com/substack/node-browserify):

```js
var EventEmitter = require('events').EventEmitter
var m = require('mithril')

function Dashboard(config){
	var dashboard = new EventEmitter()

	dashboard.vm = {}

	dashboard.controller = function() {
	    dashboard.vm.greeting = "Hello";
	};

	dashboard.view = function(vm) {
	    return m("h1", dashboard.vm.greeting);
	};
}

module.exports = Dashboard
```

Then in our app - we need a way of adding this widget to the page:

```js
var Dashboard = require('./dashboard')
var m = require('mithril')

var dashboard = Dashboard({
	summary:true
})

m.module(document.body, dashboard);
```

But this requires the top level app to know about mithril and reduces the dashboard modules portability to other applications that want to use it but have not installed mithril.

## usage with

Using `mithril-export` we create a utility `render` function to hide mithril from the top level app:

```js
var EventEmitter = require('events').EventEmitter
var m = require('mithril')
var mexport = require('mithril-export')

function Dashboard(config){
	var dashboard = new EventEmitter()

	var vm = {}

	dashboard.controller = function() {
	    vm.greeting = "Hello";
	};

	dashboard.view = function(vm) {
		return m("h1", vm.greeting);
	};

	// here we choose mexport.module or mexport.render
	// depending on if the component is auto-updating
	dashboard.render = mexport.module(dashboard)

	return dashboard
}

module.exports = Dashboard
```

And now the top level app just uses the modules api without knowing about mithril:

```js
var Dashboard = require('./dashboard')

var dashboard = Dashboard({
	summary:true
})

dashboard.render(document.body)
```

## api

##### `var fn = mexport(mithrilModule)`

Generate a function that will render a mithril module to the passed DOM element.

A mithril module is an object that has both controller and view properties.

##### `var fn = mexport.render(component)`

The same as the module method but that calls the mithril `render` method which only draws once.

## license

MIT