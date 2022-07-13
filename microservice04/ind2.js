const produce2 = require("./prod2")
const consume2 = require("./cons2")

// call the `produce` function and log an error if it occurs
produce2().catch((err) => {
	console.error("error in producer2: ", err)
})

// start the consumer, and log any errors
consume2().catch((err) => {
	console.error("error in consumer2: ", err)
})


