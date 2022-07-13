const produce1 = require("./prod1")
const consume1 = require("./cons1")

// call the `produce` function and log an error if it occurs
produce1().catch((err) => {
	console.error("error in producer1: ", err)
})

// start the consumer, and log any errors
consume1().catch((err) => {
	console.error("error in consumer1: ", err)
})


