const express = require("express");
const app = express();

const cors = require('cors');

app.use(cors())
//port 4002
app.listen(4006, function () {
console.log("listening on 4006");
});

app.get("/", (req, res) => {
    var mysql = require('mysql');
	// Check database conection
    var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"saasusers"
	});

    var test = {
        "status":"OK",
		"dbconnection":"database saasusers connected"
	}
	var test2 = {
		"status":"failed",
		"dbconnection":"database saasusers not connected"
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
    con.end()
});

app.get("/ins/:gmail/:fname/:lname", (req, res) => {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "panoplos",
        database:"saasusers"
    });

    con.connect(function(err) {
        if (err) {
            throw err;
        }

        var gmail = req.params.gmail;
        var fname = req.params.fname;
        var lname = req.params.lname;
        var days = 30;

        var insertStatement =
        `INSERT IGNORE INTO users values(?, ?, ?, ?)`;

        var items = [gmail, fname, lname, days];

        
            con.query(insertStatement, items,
            (err, results, fields) => {
            if (err) {
                console.log(
                "Unable to insert item at row ", i + 1);
                return console.log(err);
            }
            res.send("success");
        });
    });
})

app.get("/upd/:gmail/:fname/:lname/:days", (req, res) => {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "panoplos",
        database:"saasusers"
    });

    con.connect(function(err) {
        if (err) {
            throw err;
        }

        var gmail = req.params.gmail;
        var fname = req.params.fname;
        var lname = req.params.lname;
        var days = req.params.days;

        var insertStatement =
        `REPLACE INTO users values(?, ?, ?, ?)`;

        var items = [gmail, fname, lname, days];

        
            con.query(insertStatement, items,
            (err, results, fields) => {
            if (err) {
                console.log(
                "Unable to insert item at row ", i + 1);
                return console.log(err);
            }
            res.send("success");
        });
    });
    con.end();
})

app.get("/days/:gmail", (req, res) => {
    var mysql = require('mysql');
    var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"saasusers"
	});

	// JSON object to return

    //get total load
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		// Query to get the actual total load
		let myquery = "SELECT daysleft from users where email ="+"'"+req.params.gmail+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;

			res.send(result);
		});
	});
    con.end();
});
