Defer.js
=====

Run loops using callbacks to prevent 'hanging script' warnings.
Bundled for the browser using Browserify and compressed using Uglify.

Usage
=====

```javascript
var list = [ 1, 2, 3, 4, 5, 6 ];

/*
If running in a browser, `defer.browserify.js` must be included on the page.
If running in Node, use `var Defer = require( 'defer' );`
*/
	
//	Defer.each( list, action, callback )
//		Iterate over a list, calling `action` for each item.
//		`action` is called with the item as its context, and is passed the current index.
//		If `action` returns `false`, iteration stops and `callback` is never invoked.
//		`callback` is called after all items are processed, if it is a function.
Defer.each(list, function( index ) {
	console.log( 'Processing item ', index, ' with value of ', this );
}, function() {
	console.log( 'Done processing list' );
});

//	Defer.while( condition, action, callback )
//		Calls `action` as long as `condition` returns a truthy value.
//		`callback`, if it exists, is called after `condition` returns false.
//		In CoffeeScript, this can be written as Defer.while
Defer['while'](function() {
	return list.length > 0;
}, function() {
	list.pop();
}, function() {
	console.log( 'Done processing list' );
});

//	Defer.chain( functions... )
//		Simply invokes each function, in order.
Defer.chain(function() {
	console.log( 'Step one' );
}, function() {
	console.log( 'Step two' );
}, function() {
	console.log( 'Et cetera' );
})

//	Defer.forEachOf( object, action, callback )
//		`action` is called for each own property of `object`.
//		`action` is called with the value of each property as its context, with two parameters:
//			the name of the property and the value of the property.
//		If `action` returns `false`, iteration stops and `callback` is never invoked.
//		`callback` is called after all properties are processed, if it is a function.
Defer.forEachOf({
	name: 'Bob',
	age: 32
}, function( name, value ) {
	console.log( name, ' is ', value );
}, function() {
	console.log( 'Processed object' );
});
```
