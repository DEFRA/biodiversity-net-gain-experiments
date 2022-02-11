const performDatabaseBoundaryChecks = require('./database-boundary-checks')

const intersectBngGainSiteBoundaryQueryText = `
  select
    id
  from
    bng_gain_site_27700
  where
    st_intersects(st_setsrid(st_geomfromgeojson($1), 27700), shape);
`
const withinBngGainSiteBoundaryQueryText = `
  select
    id
  from
    bng_gain_site_27700
  where
    st_within(st_setsrid(st_geomfromgeojson($1), 27700), shape);
`

module.exports = async function performLandRegistryBoundaryChecks (context, message) {
  const commonBoundaryChecksConfig = {
    queryResultsPropertyName: 'ids',
    queryResultsColumnName: 'id'
  }
  const withinQueryConfig = {
    text: withinBngGainSiteBoundaryQueryText,
    values: [message.features[0].geometry]
  }
  const intersectQueryConfig = {
    text: intersectBngGainSiteBoundaryQueryText,
    values: [message.features[0].geometry]
  }
  const withinBoundaryChecksConfig =
    Object.freeze(Object.assign({
      queryConfig: withinQueryConfig,
      resultPropertyName: 'withinBngGainSiteBoundary'
    }, commonBoundaryChecksConfig))

  const intersectsBoundaryChecksConfig =
    Object.freeze(Object.assign({
      queryConfig: intersectQueryConfig,
      resultPropertyName: 'intersectsBngGainSiteBoundary'
    }, commonBoundaryChecksConfig))

  const config = { withinBoundaryChecksConfig, intersectsBoundaryChecksConfig }

  return Promise.resolve(await performDatabaseBoundaryChecks(context, message, config))
}
