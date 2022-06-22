import request from "supertest"
import Joi from 'joi'
import Inert from '@hapi/inert'
import logging from '../plugins/logging.js'
import session from '../plugins/session.js'
import Blipp from 'blipp';

import CreditSalesCalculatorRoute from '../routes/creditsalsedatacalculator.js'
import ServerConfiguration from '../server.js';
import CreditSalesCalculatorRouter from '../plugins/router.js';
import jest from 'jest-mock'

describe('Creditsalsedatacalculator controller tests', () => {
	const saveBiodiversityMetrics = jest.fn();
	saveBiodiversityMetrics.mockReturnValueOnce(
		{
			result: {
				id: 21,
				emailAddress: 'satoshi@coin.com',
				fileName: 'coin.txt',
				fileSize: '10GB',
				updatedAt: "2022-06-22T17:02:21.013Z",
				createdAt: "2022-06-22T17:02:21.013Z"
			}
		}
	);
	const creditsalesDataService = {
		saveBiodiversityMetrics
	}
	const creditSalesCalculatorRoute = new CreditSalesCalculatorRoute(creditsalesDataService);
	const creditSalesCalculatorRouter = new CreditSalesCalculatorRouter(creditSalesCalculatorRoute);
	let server;
	
	beforeEach(async () => {
		const plugins = {
			inert: Inert,
			router: creditSalesCalculatorRouter.routes(),
			logging: logging,
			session: session,
			blipp: Blipp,
			joi: Joi
		}
		const serverConfiguration = new ServerConfiguration();
		server = await serverConfiguration.createServer({}, plugins);
	});
	
	afterEach(async () => {
		await server.stop();
	});
	
	it('tests credit sales calculator controller', async function () {
		const response = await request(server.listener).post('/calculatemetric').send({
			emailAddress: 'satoshi@coin.com',
			fileName: 'coin.txt',
			fileSize: '10GB'
		});
		expect(response.statusCode).toBe(200);
		expect(response.body.result.result.id).toEqual(21);
		expect(saveBiodiversityMetrics.call.length).toBe(1);
	});
})
