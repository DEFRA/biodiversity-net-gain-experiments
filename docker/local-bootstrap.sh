# !/bin/bash
docker-compose up --build -d
# Allow the PostGIS container to initialise before importing data. Adjust the sleep time if needed.
sleep 30

echo "Importing sample Land Registry national polygon data"
(cd src/scripts/import-land-registry-sample-data && ./import.sh)

echo "Importing dummy BNG gain site"
(cd src/scripts/import-bng-gain-sites && ./import.sh)
