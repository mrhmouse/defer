build: ugly

ugly: compile
	uglifyjs2 defer.browserify.js -o defer.browserify.min.js -c -m
	uglifyjs2 defer.js -o defer.min.js -c -m

compile:
	coffee -c defer.coffee
	browserify -s Defer -o defer.browserify.js defer.js

clean:
	rm *.js
