#! /usr/bin/env bash

mysql -u root -p -e "CREATE DATABASE saasdb1"
mysql -u root -p saasdb1 < "database/saasdb1.sql"

mysql -u root -p -e "CREATE DATABASE saasdb2"
mysql -u root -p saasdb2 < "database/saasdb2.sql"
