 // Import all necessary dependencies
const { Kafka } = require("kafkajs")
const csvtojson = require('csvtojson');
const {readFileSync, promises: fsPromises} = require('fs');

// The ID that lets kafka know who produces each message
const clientId = "producer"
// The broker to use
const brokers = ["localhost:9092"]

// The 2 topics we will write mesages to
const topic1 = "aggregated_generation"
const topic2 = "actual_load"

// Initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(" ");

  return arr;

}

// The producer uses this fucntion to write 2 messages (1 for each topic)
// every 10 seconds cons (10000 ms)
const produce = async () => {
	await producer.connect()
	let i = 0; // The iteration we are currently at
    const arr1 = syncReadFile('./agptlist.txt'); // List of all csv files for saasdb1
    const arr2 = syncReadFile('./atllist.txt');  // List of all csv files for saasdb2

	// After the producer has connected, we start an interval timer
	setInterval(async () => {
		try {
            // Write each message to the corresponding topic
            // we recognize each message by its key, the current value of 'i'
            topicMessages = [
                {
                    topic: topic1,
                    messages: [{key: String(i), value: arr1[i]}]
                },
                {
                    topic: topic2,
                    messages: [{key: String(i), value: arr2[i]}]
                }
            ]
            // sendBatch sends more than 1 message at once
			await producer.sendBatch({ topicMessages })
			// If the message is written successfully, log it and increment `i`
			console.log("ATL+AGPT writes: ", i)
			i++;
		} catch (err) {
			console.error("producer.js: could not write message " + err)
		}
	}, 10000)
}

module.exports = produce
