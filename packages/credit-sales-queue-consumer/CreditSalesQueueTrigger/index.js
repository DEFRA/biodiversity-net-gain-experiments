const CreditSalesQueueClient = require('./services/calculatorAPIClient');
module.exports = async function (context, creditSalesApplication) {
    const creditSalesQueueClient = new CreditSalesQueueClient();
    let response = await creditSalesQueueClient.processCreditSalesApplication(creditSalesApplication);
    context.log('JavaScript queue trigger function processed work item', creditSalesApplication);
    //TODO check the response and dequeue the message or leave the message in the queue
    context.log('JavaScript queue trigger function response content', response);
    //TODO dequeue the message if successfully consumed
    // await queueClient.deleteMessage(message.messageId, message.popReceipt);
};
