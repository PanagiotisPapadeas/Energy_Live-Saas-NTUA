// Import all necessary dependencies
const cors = require('cors');
const csvtojson = require('csvtojson');
const express = require("express");
const { Kafka } = require("kafkajs")
var mysql = require('mysql');

const app = express();
app.use(cors());

// the client ID lets kafka know who's producing the messages
const clientId = "consumer1"
// The broker to use
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "aggregated_generation"

// Initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const consumer = kafka.consumer({ groupId: clientId })

// The consumer uses this function to read message from a specific topic
const consume1 = async () => {
	// Firstly, connect to the cluster and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic })

	let x = "";

	await consumer.run({
		// This function is called every time the consumer gets a new message
		eachMessage: ({topic, message}) => {
			// Log the message received
			console.log(`received message: ${message.value}`)
            try {
				csvtojson({delimiter:"\t"}).fromFile("../AGPT/"+message.value).then(source => {
					x = source;
				})

				var con = mysql.createConnection({
					host: "localhost",
					user: "root",
					password: "panoplos",
					database:"saasdb1"
				});

				con.connect(function(err) {
					if (err) {
						throw err;
					}

					// Fetch the data from each row and insert it to the table
					for (var i = 0; i < x.length; i++) {
						var datetim = x[i]["DateTime"],
						Res = x[i]["ResolutionCode"],
						AreaName = x[i]["AreaTypeCode"],
						mapcode = x[i]["MapCode"],
						producttype = x[i]["ProductionType"],
						actualgenout = x[i]["ActualGenerationOutput"],
						actualcons = x[i]["ActualConsumption"],
						update = x[i]["UpdateTime"]

                        if (actualgenout == '') {
                            // We only want entries with actual generation values
							// if the value is empty, ignore it and continue
                            continue;
                        }
                        if (actualcons == '') {
							// If the consumption is empty, set it to 0
                            actualcons = 0;
                        }

						var insertStatement =
						`REPLACE INTO Aggregated_Generation values(?, ?, ?, ?, ?, ?, ?)`;

						var items = [datetim, mapcode, producttype, Res, actualgenout, actualcons, update];

						if(AreaName === "CTY") {
							con.query(insertStatement, items,
							(err, results, fields) => {
							if (err) {
								console.log(
								"Unable to insert item at row ", i + 1);
								return console.log(err);
							}
							});
						}
					}
			console.log("All items stored into database successfully!");
			});
		}
            catch (err) {
                console.log("Error from consumer1");
            }

		},
	})
}

// Export module for index-db.js
module.exports = consume1
