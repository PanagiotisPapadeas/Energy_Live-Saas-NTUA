const express = require('express')
const app = express(); //instantiate an express app
const port = 9103;
const bodyparser = require('body-parser')
var path = require('path');

// =============="npm i cors"=============
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}))
//========================================

//middlewares
app.use(bodyparser.json())

//initialize port for node application to run
app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

//GET base URL path
app.get('/',(req,res) =>{
	res.sendFile(path.join(__dirname + '/htmlcss/index.html'));
});

app.get('/mycss.css',(req,res) =>{
	res.sendFile(path.join(__dirname + '/htmlcss/mycss.css'));
});


