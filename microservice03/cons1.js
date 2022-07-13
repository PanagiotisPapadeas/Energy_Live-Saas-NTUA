const express = require("express");
var mysql = require('mysql');
const csvtojson = require('csvtojson');
const app = express();
const cors = require('cors');
app.use(cors());

// the kafka instance and configuration variables are the same as before

// create a new consumer from the kafka client, and set its group ID
// the group ID helps Kafka keep track of the messages that this client
// is yet to receive
// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "my-app"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "actual_load"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const consumer = kafka.consumer({ groupId: clientId })

let j = 0;

const consume1 = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic })

	let x = "";

	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			// here, we just log the message to the standard output
			console.log(`received message: ${message.value}`)
            try {
				csvtojson({delimiter:"\t"}).fromFile("ATL/"+message.value).then(source => {
                x = source;
                console.log("j = " + j);

				})
                // console.log(x);

				var con = mysql.createConnection({
					host: "localhost",
					user: "root",
					password: "panoplos",
					database:"saasdb2"
				});



				con.connect(function(err) {
					if (err) throw err;
					console.log("Connected!");

					// Fetching the data from each row
					// and inserting to the table "sample"
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

				// Inserting data of current row
				// into database
				/*con.query(insertStatement1, items1,
					(err, results, fields) => {
					if (err) {
						console.log(
				"Unable to insert item at row ", i + 1);
						return console.log(err);
					}
				});*/
						if(AreaName === "CTY"){
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
// 			console.log(AreaName);
// 			if (AreaName === "CTA") console.log("1")
// 			else console.log("2");
			// console.log(source[0]["DateTime"]);

			console.log(
		"All items stored into database successfully");
            })
			}
            catch (err) {
                console.log("empty :(");
            }


		},
	})
}

module.exports = consume1


//port 4002
app.listen(4002, function () {
console.log("listening on 4002");
});

app.get("/insert", (req, res) => {
    var mysql = require('mysql');
    const csvtojson = require('csvtojson');
    var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"saasdb2"
	});

	//JSON object to return
    /*var test = {

	};
    test.quantity = "Actual total load";
    test.country_name = req.params.country_name;*/



	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		const fileName = "sample.csv";
		csvtojson({delimiter:"\t"}).fromFile(fileName).then(source => {

			// Fetching the data from each row
			// and inserting to the table "sample"
			for (var i = 0; i < source.length; i++) {
				var datetim = source[i]["DateTime"],
					Res = source[i]["ResolutionCode"],
					AreaName = source[i]["AreaTypeCode"],
					mapcode = source[i]["MapCode"],
					totalvalue = source[i]["TotalLoadValue"],
					update = source[i]["UpdateTime"]

				var insertStatement =
				`REPLACE INTO Actual_Load values(?, ?, ?, ?, ?)`;

				var items = [datetim, mapcode, Res, totalvalue, update];

				// Inserting data of current row
				// into database
				/*con.query(insertStatement1, items1,
					(err, results, fields) => {
					if (err) {
						console.log(
			"Unable to insert item at row ", i + 1);
						return console.log(err);
					}
				});*/
				if(AreaName === "CTY"){
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
// 			console//.log(AreaName);
// 			if (AreaName === "CTA") console.log("1")
// 			else console.log("2");
			console.log(source[0]["DateTime"]);

			console.log(
		"All items stored into database successfully");
	});
});
});


app.get("/", (req, res) => {
    var mysql = require('mysql');
//check database conection
    var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"saasdb2"
	});

    var test = {
        "status":"OK",
    "dbconnection":"database saasdb2 connected"
}
var test2 = {
    "status":"failed",
    "dbconnection":"database saasdb2 not connected"
}

//check if connection was successful
con.connect(function(err) {
    if (err) {console.log("Not Connected!");
        res.status(400).send(test2);}
    else {
        console.log("Connected!");
    res.status(200).send(test);
    }
});
});


app.get("/totalload/:country_name/:date_from/:date_to", (req, res) => {
    var mysql = require('mysql');
    //const converter = require('json-2-csv');
    var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"saasdb2"
	});

	//JSON object to return
    var test = {

	};
    test.quantity = "Actual total load";
    test.country_name = req.params.country_name;

    //get total load
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//query to get actual total load from given country and dates
		let myquery="SELECT TotalLoadValue, UpdateTime from Actual_Load WHERE MapCode="+"'"+req.params.country_name+"'"+" and DateTime >="+"'"+req.params.date_from+"'"+" and DateTime <="+"'"+req.params.date_to+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
            test.list = result;

			res.send(test);
		});
	});
});
