const Hapi = require('@hapi/hapi')
const request = require('supertest')
const start = require('../../routes/startController.js')

const server = new Hapi.Server({ port: 3000, host: 'localhost' })

// server.route({
// 	method: 'GET',
// 	path: '/',
// 	handler: function (request, reply) {
// 		return 'Hello, world!';
// 	}
// });

server.route(start);

describe('server', function() {
	it('server', function(done) {
		request(server.listener).get('/').expect(200, function(err, resp) {
			expect(resp.text).toEqual('Hello, world!')
			done()
		})
	})
})
