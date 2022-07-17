const cors = require('cors');
const express = require("express");
const app = express();
app.use(cors());

// Listen on port 4002
app.listen(4002, function () {
	console.log("Listening on port 4002");
});

// Simply check the connection and return a relevant message
app.get("/", (req, res) => {
    var mysql = require('mysql');
	// Check database conection
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

	// Check if connection was successful, otherwise print any errors that occured
	con.connect(function(err) {
		if (err) {console.log("Not Connected! " + err.toString());
			res.status(400).send(test2);}
		else {
			console.log("Connected!");
			res.status(200).send(test);
		}
	});
	con.end(); // Don't forget to close the connection afterwards
});

app.get("/totalload/:country_name/:date_from/:date_to", (req, res) => {
    var mysql = require('mysql');
    var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"saasdb2"
	});

	// JSON object to return
    var test = {

	};
    test.quantity = "Actual total load";
    test.country_name = req.params.country_name;

    //get total load
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		// Query to get the actual total load
		let myquery = "SELECT TotalLoadValue, UpdateTime from Actual_Load WHERE MapCode="+"'"+req.params.country_name+"'"+" and DateTime >="+"'"+req.params.date_from+"'"+" and DateTime <="+"'"+req.params.date_to+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
            test.list = result;

			res.send(test);
		});
	});
	con.end(); // Don't forget to close the connection afterwards
});
