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

// Listen on port 4003
app.listen(4003, function () {
console.log("listening on 4003");
});

app.get("/", (req, res) => {
    var mysql = require('mysql');
	// Check database conection
    var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"saasdb1"
	});

    var test = {
        "status":"OK",
		"dbconnection":"database saasdb1 connected"
	}
	var test2 = {
		"status":"failed",
		"dbconnection":"database saasdb1 not connected"
	}

// Check if connection was successful
con.connect(function(err) {
    if (err) {console.log("Not Connected!");
        res.status(400).send(test2);}
    else {
        console.log("Connected!");
    res.status(200).send(test);
    }
});
});

app.get("/generation/:country_name/:generation_type/:date_from/:date_to", (req, res) => {
    var mysql = require('mysql');
    var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"saasdb1"
	});

	// JSON object to return
    var test = {

	};
    test.quantity = "Generation per type";
    test.country_name = req.params.country_name;
    test.generation_type = req.params.generation_type;

	// Submit SQL query and send the result
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		// Query to get the generation output
		let myquery = "SELECT ActualGenerationOutput, UpdateTime from Aggregated_Generation WHERE MapCode="+"'"+req.params.country_name+"'"+" and ProductionType="+"'"+req.params.generation_type+"'"+" and DateTime >="+"'"+req.params.date_from+"'"+" and DateTime <="+"'"+req.params.date_to+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
            test.list = result;

			res.send(test);
		});
	});
});

