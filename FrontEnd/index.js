const express = require("express");
const app = express();

const cors = require('cors');

app.use(cors())
//port 4002
app.listen(4005, function () {
console.log("listening on 4005");
});

<<<<<<< HEAD
app.use(express.static('SSO'));
=======
app.use(express.static('Pages'));
>>>>>>> e1b00d046f925e7842056be4bd60f5e347f10b31
