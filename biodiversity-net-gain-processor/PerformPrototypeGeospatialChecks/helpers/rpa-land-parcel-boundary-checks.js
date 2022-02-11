const axios = require('axios')

const commonAxiosRequestConfig = {
  method: 'get',
  headers: {
    Accept: 'application/json'
  }
}
module.exports = async function performRpaLandParcelBoundaryChecks (context, message) {
  const result = {}
  // Build the URLs used to call the RPA Land API
  const geometryType = `esriGeometry${message.features[0].geometry.type === 'MultiPolygon' ? 'Polygon' : message.features[0].geometry.type}`
  const rings = JSON.stringify({ rings: message.features[0].geometry.type === 'MultiPolygon' ? message.features[0].geometry.coordinates[0] : message.features[0].geometry.coordinates })
  const baseRpaLandParcelsUrl = `${process.env.RPA_LAND_PARCELS_URL_ROOT}${process.env.RPA_SBI}${process.env.RPA_SBI ? '&' : ''}geometry=${rings}&geometryType=${geometryType}&inSR=27700&f=geojson&outFields=parcel_id`
  const withinRpaLandParcelsUrl = encodeURI(`${baseRpaLandParcelsUrl}&spatialRel=esriSpatialRelWithin`)
  const intersectsRpaLandParcelsUrl = encodeURI(`${baseRpaLandParcelsUrl}&spatialRel=esriSpatialRelIntersects`)

  // Build the configuration used to make calls to the RPA Land API and process responses
  const withinRpaLandParcelAxiosRequestConfig = Object.assign({ url: withinRpaLandParcelsUrl }, commonAxiosRequestConfig)
  const intersectsRpaLandParcelAxiosRequestConfig = Object.assign({ url: intersectsRpaLandParcelsUrl }, commonAxiosRequestConfig)
  const withinRpaLandParcelConfig = { axiosRequestConfig: withinRpaLandParcelAxiosRequestConfig, errorPropertyName: 'withinRpaLandParcelError' }
  const intersectsRpaLandParcelConfig = { axiosRequestConfig: intersectsRpaLandParcelAxiosRequestConfig, errorPropertyName: 'withinRpaLandParcelError' }

  result.withinRpaLandParcel = await makeRequestAndProcessResponse(context, withinRpaLandParcelConfig)

  if (result.withinRpaLandParcel.landParcels.length === 0) {
    result.intersectsRpaLandParcel = await makeRequestAndProcessResponse(context, intersectsRpaLandParcelConfig)
  }

  return Promise.resolve(result)
}

async function makeRequestAndProcessResponse (context, config) {
  const returnValue = {
    landParcels: []
  }

  let axiosResponse

  try {
    axiosResponse = await axios(config.axiosRequestConfig)

    for (const feature of axiosResponse.data.features) {
      returnValue.landParcels.push(feature.properties)
    }
  } catch (error) {
    returnValue[config.errorPropertyName] = error.message
  }
  return returnValue
}
