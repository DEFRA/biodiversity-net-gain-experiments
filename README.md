# Biodiversity Net Gain Service Alpha Experiments

This repository contains code associated with a number of standalone technical spikes performed during the alpha phase for the [Biodiversity Net Gain digital service]((https://github.com/DEFRA/biodiversity-net-gain-service)). Due to the disposable nature of the code:

* there are no accompanying unit tests or linkage with a delivery pipeline.
* some initialisaton steps have to be performed manually.

## Repository Directories

### azure-maps

This directory contains artefacts for a small Node.js web application capable of rendering Land Registry national polygon data and Rural Payment Agency land parcels using Microsoft Azure Maps for base mapping.

### biodiversity-metric-3.0-extractor

This directory contains a small Node.js application that extracts some data from part of an instance of the Natural England Biodiversity Metric 3.0 containing dummy data.

### biodiversity-net-gain-processor

This directory contains a Node.js Azure function that performs basic spatial queries on a dummy land boundary associated with an application to the Biodiversity Net Gain public register.

### docker

This directory contains artefacts for running Docker containers used by the technical spikes using Azure Maps and geospatial processing.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

[http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3)

The following attribution statement MUST be cited in your products and applications when using this information.
