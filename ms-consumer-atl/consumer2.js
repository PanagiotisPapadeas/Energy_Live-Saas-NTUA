// Import all necessary dependencies
const cors = require('cors');
const csvtojson = require('csvtojson');
const express = require("express");
const { Kafka } = require("kafkajs")
var mysql = require('mysql');

const app = express();
app.use(cors());

// the client ID lets kafka know who's producing the messages
const clientId = "consumer2"
// The broker to use
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "actual_load"

// Initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const consumer = kafka.consumer({ groupId: clientId })

// The consumer uses this function to read message from a specific topic
const consume2 = async () => {
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
				csvtojson({delimiter:"\t"}).fromFile("../ATL/"+message.value).then(source => {
                x = source;

				})

				var con = mysql.createConnection({
					host: "localhost",
					user: "root",
					password: "panoplos",
					database:"saasdb2"
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
						totalvalue = x[i]["TotalLoadValue"],
						update = x[i]["UpdateTime"]

						var insertStatement =
						`REPLACE INTO Actual_Load values(?, ?, ?, ?, ?)`;

						var items = [datetim, mapcode, Res, totalvalue, update];

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
                console.log("Error from consumer2");
            }

		},
	})
}

// Export module for index.js
module.exports = consume2
