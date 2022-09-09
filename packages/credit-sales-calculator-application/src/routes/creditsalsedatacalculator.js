import Joi from '@hapi/joi'
class CreditSalesCalculatorRoute{
	
	#creditSalesDataService = undefined;
	
	constructor(creditSalesDataService) {
		this.#creditSalesDataService = creditSalesDataService;
	}
	getDeclaredApis = () => {
		return [
			{
				method: 'POST',
				path: '/calculatemetric',
				options: {
					validate: {
						payload: Joi.object().keys({
							emailAddress: Joi.string().required(),
							fileName: Joi.string().required(),
							fileSize: Joi.string().required()
						})
					}
				},
				handler: async (request, response) => {
					const result = await this.#creditSalesDataService.saveBiodiversityMetrics(request.payload);
					return response.response({
						result
					}).code(200);
				}
			}
		];
	}
}
export default CreditSalesCalculatorRoute;
