const express = require("express");
const app = express();

const cors = require('cors');

app.use(cors())
//port 4002
app.listen(4005, function () {
console.log("listening on 4005");
});

app.use(express.static('public'));