import Hapi from '@hapi/hapi'
import Joi from 'joi'
import Inert from '@hapi/inert'
import router from './plugins/router.js'
import logging from './plugins/logging.js'
import session from './plugins/session.js'
import cache from './plugins/cache.js'
import Blipp from 'blipp'
import { SERVER_PORT } from './utils/config.js'
class ServerConfiguration{
    createServer = async (options, plugins) => {
      // Create the hapi server
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
        cache: cache
      }, options)
    
      const server = new Hapi.Server(options)
      await this.init(server, plugins);
      return server;
    }
  // init = async (server, Inert, router, logging, session, Blipp, Joi) => {
  init = async (server, plugins) => {
    // Register the plugins
    await server.register(plugins.inert)
    // await server.register(plugins.router)
    await server.register(plugins.logging)
    // await server.register(plugins.session)
    await server.register(plugins.blipp)
  
    server.validator(plugins.joi);
    // Start the server
    await server.start()
  }
}
// const createServer = async options => {
//   // Create the hapi server
//   options = Object.assign({
//     port: SERVER_PORT,
//     routes: {
//       validate: {
//         options: {
//           abortEarly: false
//         }
//       },
//       cors: true,
//       security: true
//     },
//     cache: cache
//   }, options)
//
//   return new Hapi.Server(options)
// }
//
// const init = async server => {
//   // Register the plugins
//   await server.register(Inert)
//   await server.register(router)
//   await server.register(logging)
//   await server.register(session)
//   await server.register(Blipp)
//
//   server.validator(Joi);
//   // Start the server
//   await server.start()
// }

// export { createServer, init }
export default ServerConfiguration;
