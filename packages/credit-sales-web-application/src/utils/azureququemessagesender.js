import { QueueServiceClient } from "@azure/storage-queue";
class BiodiversityQueueSender{
	constructor() {
	}
	sendBiodiversityMessagetToQueue = async (payload) => {
		const queueServiceClient = QueueServiceClient.fromConnectionString("AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;");
		const queueClient = queueServiceClient.getQueueClient('creditsales');
		await queueClient.sendMessage(JSON.stringify(payload));
	}
}

export default BiodiversityQueueSender;
