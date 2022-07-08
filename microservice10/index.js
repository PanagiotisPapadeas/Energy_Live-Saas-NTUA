const express = require("express");
const app = express();
app.listen(3002, function () {
console.log("listening on 3002");
});

app.get("/", (req, res) => {
    var mysql = require('mysql');

   var mysqlHost = process.env.MYSQL_HOST || 'localhost';
   var mysqlPort = process.env.MYSQL_PORT || '3306';
   var mysqlUser = process.env.MYSQL_USER || 'root';
   var mysqlPass = process.env.MYSQL_PASS || 'panoplos';
   var mysqlDB   = process.env.MYSQL_DB   || 'softeng2131';


	var con = mysql.createConnection({
		host: mysqlHost,
		port: mysqlPort,
		user: mysqlUser,
		password: mysqlPass,
		database: mysqlDB
	});

    var test = {
        "status":"OK",
    "dbconnection":"database softeng2131 connected"
}
var test2 = {
    "status":"failed",
    "dbconnection":"database softeng2131 not connected"
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

app.get("/chargesby/:op_ID/:date_from/:date_to", (req, res) => {
    var mysql = require('mysql');
    const converter = require('json-2-csv');
    var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"softeng2131"
	});
        
	//JSON object to return
	var test = { 

	};
	test.op_ID = req.params.op_ID;
	test.PeriodFrom = req.params.date_from;
	test.PeriodTo = req.params.date_to;
	//Json or csv
        var l = req.query.format;

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//query to get charges by data given opID and dates
		let myquery="SELECT operatorID2 as VisitingOperator, count(*) as NumberOfPasses, sum(amount) as PassesCost FROM passes WHERE pass_type = 'visitor' and operatorID1="+"'"+req.params.op_ID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'"+" group by operatorID2 order by operatorID2";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;

			//get request timestamp
	                var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
			var dateTime = date+' '+time;
			test.RequestTimestamp = dateTime;

			test.PPOList = result;
			if (l=="csv"){
			converter.json2csv(test, function(err, csv){
				if (err) throw err;
			        res.send(csv);
			});}
			else {res.send(test);}
		});
	});
});

app.get("/update", (req, res) => {
res.send("Update User");
});

app.get("/insert", (req, res) => {
res.send("Insert User");
});