const amqp = require("amqplib");
const fs = require("fs");
require('dotenv').config()
async function publishUserRegistrationEvent(user) {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = "user_registration_queue";
    const message = `User registered: ${JSON.stringify(user)}`;

    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Sent: ${message}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error publishing event:", error);
  }
}



async function startEventListener() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = "user_registration_queue";

    await channel.assertQueue(queue);
    channel.consume(queue, (message) => {
      if (message !== null) {
        const logMessage = `Received: ${message.content.toString()}\n`;

        fs.appendFile("event_log.txt", logMessage, (err) => {
          if (err) {
            console.error("Error writing to log file:", err);
          }
        });

        console.log(logMessage);
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error starting event listener:", error);
  }
}

startEventListener();


module.exports = {publishUserRegistrationEvent}