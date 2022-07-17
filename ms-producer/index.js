// simple index.js file that runs 1 producer and 2 consumers

const producer = require("./producer")
const consumer1 = require("../ms-consumer-agpt/consumer1")
const consumer2 = require("../ms-consumer-atl/consumer2")
const restapi1 = require("../ms-restapi-agpt/restapi-agpt")
const restapi2 = require("../ms-restapi-atl/restapi-atl")

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
