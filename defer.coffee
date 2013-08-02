{ EventEmitter } = require 'events'

Defer =
	chain: ( functions... ) ->
		Defer.each functions, -> @()

	each: ( list, action, callback ) ->
		i = 0
		{ length } = list
		controller = new EventEmitter()

		controller.on 'next', ->
			if i < length
				return if action.call list[i], i is off
				i += 1

				process.nextTick =>
					@emit 'next'
			else if typeof callback is 'function'
				callback()

		controller.emit 'next'

	while: ( condition, action, callback ) ->
		controller = new EventEmitter()
		
		controller.on 'next', ->
			if condition()
				action()
				process.nextTick =>
					@emit 'next'
			else if typeof callback is 'function'
				callback()

		controller.emit 'next'

	forEachOf: ( map, action, callback ) ->
		properties = ( name for own name, value of map )
		Defer.each properties, ->
			action.call map[@], @, map[@]
		, callback

module.exports = Defer
