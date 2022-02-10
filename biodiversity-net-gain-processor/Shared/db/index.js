const { Pool } = require('pg')
const pool = new Pool()

module.exports = {
  query: async (config) => {
    return await pool.query(config)
  }
}
