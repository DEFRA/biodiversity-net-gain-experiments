import sendBiodiversityMessagetToQueue from '../utils/azurequeuemessagesender.js'
import {UPLOADED_FILE_DIRECTORY_NAME} from '../utils/config.js';
import processBiodiversityMetrics from '../utils/biodiversityExtractor.js'

const confirmuploadController = [{
		method: 'GET',
		path: '/metric-file-confirm',
		config: {
			handler: function (request, response) {
				console.log('****** File upload called ' + request.yar.get('sessionEmailAddress'))
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
				const destinationFilePath = UPLOADED_FILE_DIRECTORY_NAME + request.payload.fileName;
				let biodiversityMetricsData = processBiodiversityMetrics(undefined, destinationFilePath);
				// request.yar.get('biodiversityMetricsData').habitatBaseline.forEach((baseline) => {
				
				biodiversityMetricsData.habitatBaseline.forEach((baseline) => {
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
				await sendBiodiversityMessagetToQueue(request.yar.get('biodiversityMetricsData'));
				return response.view('metric-file-calculation', {
					habitatData: habitatDetails
				});
			}
		}
	}];

export default confirmuploadController;
