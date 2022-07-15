 // import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs")
const csvtojson = require('csvtojson');
const {readFileSync, promises: fsPromises} = require('fs');

// the client ID lets kafka know who's producing the messages
const clientId = "producer"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic1 = "aggregated_generation"
const topic2 = "actual_load"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(" ");

  return arr;

}

// we define an async function that writes a new message each second
const produce = async () => {
	await producer.connect()
	let i = 0;
	let str = "";
    const arr1 = syncReadFile('./agptlist.txt');
    const arr2 = syncReadFile('./atllist.txt');

	// after the produce has connected, we start an interval timer
	setInterval(async () => {
		try {

            // Fetching the data from each row
            // and inserting to the table "sample"
//             for (var i = 0; i < source.length; i++) {
//                 console.log(source[i]);}}
			// send a message to the configured topic with
			// the key and value formed from the current value of `i`
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
			await producer.sendBatch({ topicMessages })
			// if the message is written successfully, log it and increment `i`
			console.log("ATL+AGPT writes: ", i)
			i++
		} catch (err) {
			console.error("actual_load: could not write message " + err)
		}
	}, 10000)
}

module.exports = produce
