# Biodiversity Net Gain Service Alpha Experiments

## biodiversity-net-gain-processor

This directory contains a Node.js Azure function that performs basic spatial queries on a dummy land boundary associated with an application to the Biodiversity Net Gain public register.

### Pre-requisites

* 'NIX operating system with [Node.js](https://nodejs.org/) 14 or later installed.
* Access to an Azure Service Bus client such as [Azure Service Bus Explorer](https://docs.microsoft.com/en-us/azure/service-bus-messaging/explorer).
* A Microsoft Azure subscription with a resource group containing the following items:
  * Storage account.
  * Function app instance with associated Application Insights instance.
  * Service bus instance with following queues:
    * bng-registration-application-queue.
    * bng-registration-application-result-queue.
* Ensure the containerised software documented in the **docker** subdirectory of the root directory of all the alpha experiments is configured and running.
* If running locally, [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) for Azure Functions version 4 **must** be installed.

### Mandatory Function App Settings/Environment Variables

| name | description |
|------|-------------|
| APPINSIGHTS_INSTRUMENTATIONKEY | Instrumentation key controlling if telemetry is sent to the ApplicationInsights service |
| APPLICATIONINSIGHTS_CONNECTION_STRING | Connection string for ApplicationInsights |
| AzureWebJobsServiceBus | Service bus connection string used by the function app |
| AzureWebJobsStorage | Storage account connection string used by the function app |
| FUNCTIONS_EXTENSION_VERSION | Functions runtime version (**must be ~4**) |
| FUNCTIONS_WORKER_RUNTIME | The language worker runtime to load in the function app (**must be node**) |
| WEBSITE_NODE_DEFAULT_VERSION | Default version of Node.js (**Microsoft Azure default is recommended**) |
| WEBSITE_CONTENTSHARE | The file path to the function app code and configuration |
| WEBSITE_CONTENTAZUREFILECONNECTIONSTRING | Connection string for storage account where the function app code and configuration are stored |
| PGDATABASE | PostGIS database name (**must be bng**) |
| RPA_LAND_PARCELS_URL_ROOT | The root of all URLs used to query the RPA Land API for land parcels. For example, <https://environment.data.gov.uk/arcgis/rest/services/RPA/LandParcels/MapServer/0/query?where=> |
| RPA_SBI | RPA Single Business Identifier used when querying the RPA Land API in the form SBI=&lt;&lt;RPA SBI&gt;&gt;. For example, SBI=123456789

### Setup

* Install node modules
  * Run **npm i** from the directory containing this file.

### Run The Application Locally

* Run **func start** from the directory containing this file.
* Place the content of a GeoJSON file defining a polygon or multi-polygon using the United Kingdom spatial reference system (spatial reference system ID 27700) on **bng-registration-application-queue**. The GeoJSON defines a dummy BNG gain site.
  * The **data** subdirectory of the directory containing this file contains a sample file if needed.

### Results

* When spatial processing has been completed the results should be placed in a message on bng-registration-application-result-queue. The results contain the following:
  * An indication of whether or not the submitted data is within and/or overlaps:
    * Any polygons in the sample Land Registry data.
    * Any RPA land parcels associated with in the configured RPA Single Business Identifier.
    * Any existing BNG gain site.
      * **NOTE** - If the sample dummy BNG gain site data is used, the results should reflect the existence of the same data in the containerised PostGIS database.
