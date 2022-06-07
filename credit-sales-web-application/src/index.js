import { createServer, init, start } from './server.js'

createServer()
  .then(server =>
      init(server)
          .then(server =>
            start(server)
              .catch(err => {
                console.error(err)
                process.exit(1)
              }))
  )
