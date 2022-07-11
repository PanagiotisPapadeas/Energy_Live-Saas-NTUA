const express = require("express");
const app = express();

//port 4002
app.listen(4002, function () {
console.log("listening on 4002");
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


	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//query to get actual total load from given country and dates
		let myquery="SELECT TotalLoadValue, UpdateTime from actual_load, country WHERE actual_load.MapCode = country.MapCode and Name="+"'"+req.params.country_name+"'"+" and DateTime >="+"'"+req.params.date_from+"'"+" and DateTime <="+"'"+req.params.date_to+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
            test.list = result;

			res.send(test);
		});
	});
});
