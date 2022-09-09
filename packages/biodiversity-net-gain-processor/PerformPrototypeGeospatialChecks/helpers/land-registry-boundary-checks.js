const performDatabaseBoundaryChecks = require('./database-boundary-checks')

const intersectTitleBoundaryQueryText = `
  select
    title_no
  from
    lr_national_polygon_27700
  where
    st_intersects(st_setsrid(st_geomfromgeojson($1), 27700), shape);
`
const withinTitleBoundaryQueryText = `
  select
    title_no
  from
    lr_national_polygon_27700
  where
    st_within(st_setsrid(st_geomfromgeojson($1), 27700), shape);
`

module.exports = async function performLandRegistryBoundaryChecks (context, message) {
  const commonBoundaryChecksConfig = {
    queryResultsPropertyName: 'titleNumbers',
    queryResultsColumnName: 'title_no'
  }
  const withinQueryConfig = {
    text: withinTitleBoundaryQueryText,
    values: [message.features[0].geometry]
  }
  const intersectQueryConfig = {
    text: intersectTitleBoundaryQueryText,
    values: [message.features[0].geometry]
  }
  const withinBoundaryChecksConfig =
    Object.freeze(Object.assign({
      queryConfig: withinQueryConfig,
      resultPropertyName: 'withinLandRegistryTitleBoundary'
    }, commonBoundaryChecksConfig))

  const intersectsBoundaryChecksConfig =
    Object.freeze(Object.assign({
      queryConfig: intersectQueryConfig,
      resultPropertyName: 'intersectsLandRegistryTitleBoundary'
    }, commonBoundaryChecksConfig))

  const config = { withinBoundaryChecksConfig, intersectsBoundaryChecksConfig }

  return Promise.resolve(await performDatabaseBoundaryChecks(context, message, config))
}
