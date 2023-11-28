import amqp from 'amqplib/callback_api';
import * as dotenv from "dotenv";
dotenv.config();


export default function publishToQueue(queueName, data) {
    amqp.connect(`${process.env.RABBITMQ_SERVER_URL}`, (err, connection) => {
        if (err) {
            throw err;
        }

        connection.createChannel((err, channel) => {
            if (err) {
                throw err;
            }

            channel.assertQueue(queueName, {
                durable: false
            });

            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
            console.log(`Message sent to ${queueName}`);
        });
    });
}