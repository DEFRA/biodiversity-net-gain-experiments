// import sendBiodiversityMessagetToQueue from '../utils/azurequeuemessagesender.js'
import BiodiversityQueueSender from '../utils/azureququemessagesender.js'
import {UPLOADED_FILE_DIRECTORY_NAME} from '../utils/config.js';
import processBiodiversityMetrics from '../utils/biodiversityExtractor.js'

const confirmuploadController = [{
		method: 'GET',
		path: '/metric-file-confirm',
		config: {
			handler: function (request, response) {
				return response.view('metric-file-confirm');
			}
		}
	},
	{
		method: 'POST',
		path: '/confirm-upload',
		config: {
			handler: async function (request, response) {
				const habitatDetails = [];
				let biodiversityMetricsData = await request.server.session.get('biodiversityMetricsData');
				if(biodiversityMetricsData != undefined) {
					let extractedData = JSON.parse(biodiversityMetricsData);
					extractedData.habitatBaseline.forEach((baseline) => {
						
						habitatDetails.push([
							{
								text: baseline.habitatType
							},
							{
								text: baseline.area
							},
							{
								text: baseline.condition
							},
							{
								text: baseline.bioDiversityNeeded
							}
						])
					})
					let azureQueueSender = new BiodiversityQueueSender();
					await azureQueueSender.sendBiodiversityMessagetToQueue(extractedData);
					return response.view('metric-file-calculation', {
						habitatData: habitatDetails
					});
				}else{
					return response.redirect('start');
				}
			}
		}
	}];

export default confirmuploadController;
