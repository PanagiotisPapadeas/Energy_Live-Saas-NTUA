 // Import all necessary dependencies
const { Kafka } = require("kafkajs")
const csvtojson = require('csvtojson');
const {readFileSync, promises: fsPromises} = require('fs');

// the client ID lets kafka know who's producing the messages
const clientId = "producer1"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "aggregated_generation"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(" ");

  return arr;

}

// we define an async function that writes a new message each second
const produce1 = async () => {
	await producer.connect()
	let i = 0;
	let str = "";
    const arr = syncReadFile('./agptlist.txt');

	// after the produce has connected, we start an interval timer
	setInterval(async () => {
		try {
            // Fetching the data from each row
            // and inserting to the table "sample"

			// send a message to the configured topic with
			// the key and value formed from the current value of `i`
			await producer.send({
				topic,
				messages: [
					{
						key: String(i),
						value: arr[i],
					},
				],
			})
			// if the message is written successfully, log it and increment `i`
			console.log("AGPT writes: ", i)
			i++
		} catch (err) {
			console.error("aggregated_generation: could not write message " + err)
		}
	}, 8000)
}

module.exports = produce1


