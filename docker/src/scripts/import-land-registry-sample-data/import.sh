# !/bin/bash
ogr2ogr -f "PostgreSQL" PG:"host=127.0.0.1 port=5432 dbname=bng user=postgres" -nln lr_national_polygon_27700 -sql "select poly_id, title_no, insert as insert_timestamp, update as update_timestamp from lr_poly_sample" "LR_POLY_SAMPLE.json"

ogr2ogr -f "PostgreSQL" PG:"host=127.0.0.1 port=5432 dbname=bng user=postgres" -nln lr_national_polygon_4326 -sql "select poly_id, title_no, insert as insert_timestamp, update as update_timestamp from lr_poly_sample" -s_srs EPSG:27700 -t_srs EPSG:4326 "LR_POLY_SAMPLE.json"
