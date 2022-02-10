const db = require('../../Shared/db')

module.exports = async function performDatabaseBoundaryChecks (context, message, config) {
  const result = {}
  result[config.withinBoundaryChecksConfig.resultPropertyName] = await makeRequestAndProcessResponse(context, config.withinBoundaryChecksConfig)

  if (result[config.withinBoundaryChecksConfig.resultPropertyName][config.withinBoundaryChecksConfig.queryResultsPropertyName].length !== 1) {
    result[config.intersectsBoundaryChecksConfig.resultPropertyName] = await makeRequestAndProcessResponse(context, config.intersectsBoundaryChecksConfig)
  }
  return result
}

async function makeRequestAndProcessResponse (context, config) {
  const returnValue = {}
  returnValue[config.queryResultsPropertyName] = []

  let result

  try {
    result = await db.query(config.queryConfig)

    for (const row of result.rows) {
      returnValue[config.queryResultsPropertyName].push(row[config.queryResultsColumnName])
    }
  } catch (error) {
    returnValue[config.errorPropertyName] = error.message
  }
  return returnValue
}
