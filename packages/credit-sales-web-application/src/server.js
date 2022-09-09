import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert'
import views from './plugins/views.js'
import router from './plugins/router.js'
import errorPages from './plugins/error-pages.js'
import logging from './plugins/logging.js'
import CreditSalesCache from './utils/creditsalescache.js'
import Blipp from 'blipp'
import { SERVER_PORT } from './utils/config.js'

const createServer = async options => {
  // Create the hapi server
  let creditSalesCache = new CreditSalesCache();
    options = Object.assign({
      port: SERVER_PORT,
      routes: {
        validate: {
          options: {
            abortEarly: false
          }
        },
        cors: true,
        security: true
      },
    }, options);
  let server = new Hapi.Server(options);
  await creditSalesCache.init();
  server.session = creditSalesCache;
  return server;
}

const init = async server => {
  
  await server.register(Inert)
  await server.register(views)
  await server.register(router)
  await server.register(errorPages)
  await server.register(logging)
  // await server.register(session)
  await server.register(Blipp)
  
  await server.start();
}

export { createServer, init}
