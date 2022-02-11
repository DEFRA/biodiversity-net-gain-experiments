const performLandRegistryBoundaryChecks = require('./helpers/land-registry-boundary-checks')
const performRpaLandParcelBoundaryChecks = require('./helpers/rpa-land-parcel-boundary-checks')
const performBngGainSiteBoundaryChecks = require('./helpers/bng-gain-site-boundary-checks')

module.exports = async function (context, message) {
  context.log('Processing', JSON.stringify(message))
  const result = {}
  result.landRegistryBoundaryChecks = await performLandRegistryBoundaryChecks(context, message)
  result.rpaLandParcelBoundaryChecks = await performRpaLandParcelBoundaryChecks(context, message)
  result.bngGainSiteBoundaryChecks = await performBngGainSiteBoundaryChecks(context, message)
  context.bindings.geospatialValidationResult = result
}
