const loginRoute = [
	{
		method: 'GET',
		path: '/login',
		handler: {
			view: 'login'
		}
	},
	{
		method: 'POST',
		path: '/login',
		handler: async (request, response) => {
			await request.server.session.set('sessionEmailAddress', request.payload.emailAddress);
			return response.redirect('metric-file-upload', {
				emailAddress: request.payload.emailAddress,
			});
		}
	}
];
export default loginRoute;
