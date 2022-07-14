const produce2 = require("./producer2")
const consume2 = require("./consumer2")

// call the `produce` function and log an error if it occurs
produce2().catch((err) => {
	console.error("error in producer1: ", err)
})

// start the consumer, and log any errors
consume2().catch((err) => {
	console.error("error in consumer1: ", err)
})


