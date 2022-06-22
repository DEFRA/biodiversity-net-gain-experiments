import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const DataTypes  = require('sequelize');

class CreditsalesDataService{
	
	#developer = undefined;
	
	constructor(sequelize) {
		this.#developer = sequelize.define("Developer", {
			emailAddress: {
				type: DataTypes.STRING,
				allowNull: false
			},
			fileName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			fileSize: {
				type: DataTypes.STRING,
				allowNull: false
			}
		})
	}
	
	saveBiodiversityMetrics = async (payload) => {
		
		await this.#developer.sync({ alter: true });
		const emailAddress = payload.emailAddress;
		const fileName = payload.fileName;
		const fileSize = payload.fileSize;

		return await this.#developer.create({emailAddress, fileName, fileSize});
	}
}

export default CreditsalesDataService;
