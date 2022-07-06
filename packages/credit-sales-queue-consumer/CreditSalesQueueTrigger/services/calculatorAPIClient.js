const fetch = require('node-fetch');
const CALCULATION_URL = require('../utils/config.js');
const axios = require('axios');
class CreditSalesQueueClient{
	
	processCreditSalesApplication = async (applicationData) => {
		console.log('Sending request ' + JSON.stringify(applicationData));
		let response = await axios.post('http://localhost:3000/calculatemetric', applicationData)
			.then(function (response){
				console.log("Success response " + response.status);
				return response.status;
			}).catch(function(error){
				return error.response;
			});
		
		return await response;
	}
}
module.exports = CreditSalesQueueClient;
