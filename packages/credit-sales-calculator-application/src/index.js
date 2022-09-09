// import { createServer, init } from './server.js'
import Joi from 'joi'
import Inert from '@hapi/inert'
import router from './plugins/router.js'
import logging from './plugins/logging.js'
import session from './plugins/session.js'
import Blipp from 'blipp';
import CreditSalesCalculatorRoute from './routes/creditsalsedatacalculator.js'
import ServerConfiguration from './server.js';
import CreditsalesDataService from './utils/creditsalesDataService.js';
import CreditSalesCalculatorRouter from './plugins/router.js';
import {POSTGRES_URL} from './utils/config.js';
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize(POSTGRES_URL);
const creditsalesDataService = new CreditsalesDataService(sequelize);
const creditSalesCalculatorRoute = new CreditSalesCalculatorRoute(creditsalesDataService);
const creditSalesCalculatorRouter = new CreditSalesCalculatorRouter(creditSalesCalculatorRoute);

const plugins = {
	inert: Inert,
	router: creditSalesCalculatorRouter.routes(),
	logging: logging,
	session: session,
	blipp: Blipp,
	joi: Joi
}
const serverConfiguration = new ServerConfiguration();
await serverConfiguration.createServer({}, plugins);
