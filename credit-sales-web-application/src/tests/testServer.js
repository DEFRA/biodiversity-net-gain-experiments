const hapi = require('@hapi/hapi');
const server = new hapi.Server({ port: 3000, host: 'localhost' });

server.route({
	method: 'GET',
	path: '/',
	handler: function(){
		return 'Hello world';
	}
});

exports.init = async () => {
	await server.initialize();
	return server;
}

exports.start = async () => {
	await server.start();
	console.log('Server running at : ${server.info.uri}');
	return server;
}

process.on('unhandledRejection', (err) => {
	console.log('******* ERROR ************');
	console.log(err);
	process.exit(1);
})
