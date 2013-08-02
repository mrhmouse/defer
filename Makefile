build: ugly

ugly: compile
	uglifyjs2 deferredEach.browserify.js -o deferredEach.browserify.min.js -c -m
	uglifyjs2 deferredEach.js -o deferredEach.min.js -c -m

compile:
	coffee -c deferredEach.coffee
	browserify -s Defer -o deferredEach.browserify.js deferredEach.js

clean:
	rm *.js
