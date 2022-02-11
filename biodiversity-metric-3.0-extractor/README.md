# Biodiversity Net Gain Service Alpha Experiments

## biodiversity-metric-3.0-extractor

This directory contains a small Node.js application that extracts some data from part of an instance of the Natural England Biodiversity Metric 3.0 containing dummy data.

### Pre-requisites

* 'NIX operating system with [Node.js](https://nodejs.org/) 14 or later installed.
* A [Biodiversity Metric 3.0](http://publications.naturalengland.org.uk/publication/6049804846366720) file called **metric.xlsm** containing data in the A1 and A2 tabs.
  * A sample file is provided.

### Setup

* Install node modules
  * Run **npm i** from the directory containing this file.

### Run The Application

* Run **node main** from the directory containing this file.

### Results

* A file called **extractedMetric.xslx** should be created in the directory containing this file. The new file will contain a small subset of data extracted from the A1 and A2 tabs of **metric.xlsm**. Data is extracted into another spreadsheet for ease of viewing.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

[http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3)

The following attribution statement MUST be cited in your products and applications when using this information.
