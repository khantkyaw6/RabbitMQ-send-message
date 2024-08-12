const amqp = require("amqplib");

// RabbitMQ connection URL
const url = "amqp://guest:guest@localhost";

// Queue name
const queue = "nodequeue001";

async function sendMessage(msg) {
	try {
		// Connect to RabbitMQ server
		const connection = await amqp.connect(url);
		const channel = await connection.createChannel();

		// Declare the queue to use
		await channel.assertQueue(queue);

		// Send the message to the queue
		await channel.sendToQueue(queue, Buffer.from(msg));

		console.log(`Message sent to ${queue}: ${msg}`);

		//Close the connection to RabbitMQ server

		await channel.close();
		await connection.close();
	} catch (error) {
		console.log(error);
	}
}

// Usage Example

sendMessage("Hello Test Again");
