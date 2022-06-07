describe('server wrapper', () => {
  
  it('runs initialisation', (done) => {
    jest.isolateModules(() => {
      try {
        jest.mock('../../server.js')
        const { createServer, init } = require('../../server.js')
        createServer.mockImplementation(() => Promise.resolve())
        init.mockImplementation(() => Promise.resolve())

        setImmediate(() => {
          expect(createServer).toHaveBeenCalled()
          expect(init).toHaveBeenCalled()
          done()
        })
      } catch (e) {
        done();
      }
    })
  })
})
