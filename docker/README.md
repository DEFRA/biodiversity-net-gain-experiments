# Containers Used By Biodiversity Net Gain (BNG) Service Alpha Experiments

Containers used by the technical spikes for Azure Maps and geospatial processing:

* [PostGIS](https://postgis.net/) container for sample Land Registry national polygon data and dummy Biodiversity Net Gain land boundary data.
* [Geoserver](http://geoserver.org/) container for visualisation of:
  * [Sample Land Registry National Polygon data](https://use-land-property-data.service.gov.uk/datasets/nps).
  * Dummy Biodiversity Net Gain land boundary data.

## Pre-requisites

* 'NIX operating system with ogr2ogr, docker and docker-compose installed.
* Experience with [Docker](https://www.docker.com/), GeoServer and Postgres/PostGIS.
* Access to sample Land Registry national Polygon data.
* Ability to perform the following operations in Geoserver:
  * Create a workspace.
  * Add the PostGIS database as a Geoserver store.
  * Add the sample Land Registry national polygon data and dummy BNG gain site data as layers published as a Web Feature Service.

## Setup

The set up process makes use of partial automation. As these containers are used as part of alpha exploration activities, no use of the GeoServer REST API has been made. GeoServer **must** be configured manually.

* Create an environment variable called **PGPASSWORD**. The value will be used as the password for the **postgres** account of the PostGIS database.
* Create an environment variable called **POSTGRES_PASSWORD_ARG**. The value **MUST** be set to the same value as that of the **PGPASSWORD** environment variable.
* Ensure the sample Land Registry National polygon data is contained in a file called **LR_POLY_SAMPLE.json**
* Place LR_POLY_SAMPLE.json in the directory **src/scripts/import-land-registry-sample-data**.
* Run **./local-bootstrap.sh** to create the docker containers and import the following into the PostGIS database:
  * dummy BNG gain site data.
  * sample Land Registry national polygon data.
* Log into the Geoserver instance (<http://localhost:8080/geoserver>) using default credentials (username=admin, password=geoserver).
* Create a workspace called **bng**
* Add the PostGIS database as a Geoserver store in the bng workspace ensuring:
  * host=**database**
  * database=**bng**
  * port=**5432**
  * schema=**public**
  * user=**postgres**
  * password=**value of the POSTGRES_PASSWORD_ARG environment variable**
* Add **bng_gain_site_4326** and **lr_national_polygon_4326** as layers ensuring:
  * Native bounding boxes are computed from data.
  * Lat/Lon bounding boxes are computed from native bounds.
  * WFS is enabled as a service for publishing.
* Ensure GeoJSON for both layers can be obtained from a layer preview.

## Troubleshooting

* If the bootstrapping process attempts to import data before container initialisation has completed:
  * delete the containers.
  * increase the sleep period in **local_bootstrap.sh**.
  * Run **./local-bootstrap.sh** again.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

[http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3)

The following attribution statement MUST be cited in your products and applications when using this information.
