Defer.js
=====

Run loops using callbacks to prevent 'hanging script' warnings.
Bundled for the browser using Browserify and compressed using Uglify.

Usage
=====

```javascript
var	list = [ 1, 2, 3, 4, 5, 6 ];

/*
If running in a browser, `defer.browserify.js` must be included on the page.
If running in Node, use `var Defer = require( 'defer' );`
*/
	
Defer.each(list, function( index ) {
	console.log( 'Processing item ', index, ' with value of ', this );
}, function() {
	console.log( 'Done processing list' );
});

Defer.while(function() {
	return list.length > 0;
}, function() {
	list.pop();
}, function() {
	console.log( 'Done processing list' );
});
```
