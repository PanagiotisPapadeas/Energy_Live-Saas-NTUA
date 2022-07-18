#! /usr/bin/env bash

# Build script for the project to run locally
# It creates all 3 databases and the corresponding tables
# and creates the 2 Kafka topics we will use

# Change the variable to Kafka's installation directory
KAFKA_DIR="/usr/share/kafka"

mysql -u root -p -e "CREATE DATABASE saasdb1"
mysql -u root -p saasdb1 < "database/saasdb1.sql"

mysql -u root -p -e "CREATE DATABASE saasdb2"
mysql -u root -p saasdb2 < "database/saasdb2.sql"

mysql -u root -p -e "CREATE DATABASE saasusers"
mysql -u root -p saasdb2 < "database/saasusers.sql"

# Create Kafka topic "aggregated_generation"
$KAFKA_DIR/bin/kafka-topics.sh --create --topic aggregated_generation --bootstrap-server localhost:9092

# Create Kafka topic "actual_load"
$KAFKA_DIR/bin/kafka-topics.sh --create --topic actual_load --bootstrap-server localhost:9092
