const cors = require('cors');
const express = require("express");
const app = express();
app.use(cors());

// Listen on port 4003
app.listen(4003, function () {
	console.log("Listening on port 4003");
});

// Simply check the connection and return a relevant message
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

		// Check if connection was successful, otherwise print any errors that occured
		con.connect(function(err) {
			if (err) {
				console.log("Not Connected! " + err.toString());
				res.status(400).send(test2);
			}
			else {
				console.log("Connected!");
				res.status(200).send(test);
			}
		});

	con.end(); // Don't forget to close the connection afterwards
});

//get aggregated generation values
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
	// con.end(); // Don't forget to close the connection afterwards
});
