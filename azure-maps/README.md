# Biodiversity Net Gain Service Alpha Experiments - Azure Maps Technical Spike

A small Node.js web application capable of rendering Land Registry national polygon data and Rural Payment Agency (RPA) land parcels with Microsoft Azure Maps for base mapping. RPA land parcels are sourced from the [RPA Land API](https://environment.data.gov.uk/rpa/api).

## Pre-requisites

* 'NIX operating system with [Node.js](https://nodejs.org/) 14 or later installed.
* A Microsoft Azure Maps subscription key.
* An RPA Single Business Identifier associated with land parcels close to [sample Land Registry National Polygon data](https://use-land-property-data.service.gov.uk/datasets/nps).
* Ensure the containerised software documented in the **docker** subdirectory of the root directory of all the alpha experiments is configured and running.

## Setup

* Copy **assets/config/config.json.template** to **assets/config/config.json**.
* Within **assets/config/config.json**, replace the placeholders from the template with actual values

  ```yaml
    {
      "subscriptionKey": "<<Azure Maps subscription key>>"
      "rpaSbi": "<<Rural Payments Agency Single Business Identifier>>",
      "lrNationalPolygonUrlRoot": "<<Root URL of Geoserver instance containing sample Land Registry national polygon data - for example, http://localhost:8080>>"
    }

* Install node modules
  * Run **npm i** from the directory containing this file.
* Build the application
  * Run **npm run build** from the directory containing this file.

### Run The Application

* Run **npm start** from the directory containing this file.
* Open **<http://localhost:3001>** in a browser.

### Results

* An aerial Microsoft Azure map should be displayed and focused in an area covered by sample Land Registry national polygon data.
* A layer for the sample Land Registry national polygon data can be toggled on and off.
* A layer showing land parcels associated with the configured RPA Single Business Identifier can be toggled on and off.
  * If the associated land parcels are in a different area of the map, that area of the map will need to be viewed accordingly.
