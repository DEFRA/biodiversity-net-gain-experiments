import jest from 'jest-mock';
import { when } from 'jest-when';
import CreditsalesDataService from '../utils/creditsalesDataService';

describe('Credit sales data service tests', () => {
	
	let creditsalesDataService = undefined;
	let sequelize = undefined;
	let developer = undefined;
	
	beforeEach(async () => {
		const sync = jest.fn();
		const define = jest.fn();
		const create = jest.fn();
		sequelize = {
			define
		}
		developer = {
			create,
			sync
		}
		
		when(define).calledWith(expect.anything(), expect.anything()).mockReturnValue(developer);
		creditsalesDataService = new CreditsalesDataService(sequelize);
	});
	
	afterEach(async () => {
		creditsalesDataService = undefined;
		sequelize = undefined;
		developer = undefined;
	});
	
	it('tests credit sales data calculator storage', async () => {
		const result = await creditsalesDataService.saveBiodiversityMetrics({
			"emailAddress": "rene@test.com",
			"fileName": "testfile.xsls",
			"fileSize": "10GB"
		});
		
		expect(sequelize.define.call.length).toBe(1);
		expect(developer.create.call.length).toBe(1);
		expect(developer.sync.call.length).toBe(1);
	})
})
