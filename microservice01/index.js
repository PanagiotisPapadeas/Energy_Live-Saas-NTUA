// simple index.js file that runs 1 producer and 2 consumers

const producer = require("./producer")
const consumer1 = require("../microservice02/consumer1")
const consumer2 = require("../microservice03/consumer2")

// start the producer, and log any errors
producer().catch((err) => {
	console.error("error in producer: ", err)
})

// start consumer 1, and log any errors
consumer1().catch((err) => {
	console.error("error in consumer1: ", err)
})

// start consumer 2, and log any errors
consumer2().catch((err) => {
	console.error("error in consumer2: ", err)
})



