const lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const {afterEach, beforeEach, describe, it} = exports.lab = lab.script();
const {init} = require('./testServer.js');

describe('GET', () => {
	let server;
	
	beforeEach(async () => {
		server = await init();
	});
	
	afterEach(async () => {
		await server.stop();
	});
	
	it('responds with 200', async () => {
		const res = await server.inject({
			method: 'GET',
			url: '/'
		});
		expect(res.statusCode).to.equals(200);
	})
})
