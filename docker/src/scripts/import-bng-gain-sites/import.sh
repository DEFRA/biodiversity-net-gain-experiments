# !/bin/bash
ogr2ogr -f "PostgreSQL" PG:"host=127.0.0.1 port=5432 dbname=bng user=postgres" "dummy-bng-gain-site.geojson" -nln bng_gain_site_27700

ogr2ogr -f "PostgreSQL" PG:"host=127.0.0.1 port=5432 dbname=bng user=postgres" "dummy-bng-gain-site.geojson" -nln bng_gain_site_4326 -s_srs EPSG:27700 -t_srs EPSG:4326
