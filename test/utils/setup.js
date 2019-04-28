const jsdom = require('jsdom')
const fs = require('fs')
const svelte = require('svelte/compiler')

require('source-map-support').install()

const {window} = new jsdom.JSDOM('<html><body></body></html>', {
	url: "http://localhost"
})
global.document = window.document
global.getComputedStyle = window.getComputedStyle
global.navigator = {userAgent: 'fake'}
global.window = window

process.env.TEST = true

require.extensions['.svelte'] = function (module, filename) {
	const code = fs.readFileSync(filename, 'utf-8')
	try {
		const compiled = svelte.compile(code, {
			format: 'cjs'
		})
		return module._compile(compiled.js.code, filename)
	} catch (err) {
		console.log(code) // eslint-disable-line no-console
		throw err
	}
}
