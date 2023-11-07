import amqp from "amqplib";
import * as dotenv from "dotenv";
dotenv.config();

import Post from "./models/post.js";

let connection;
export default function RabbitMQ() {
  if (connection) {
    return Promise.resolve(connection);
  }

  return new Promise((resolve, reject) => {
    amqp
      .connect(process.env.RABBIT_MQ_URL)
      .then((conn) => {
        connection = conn;

        console.log("Connected to RabbitMQ...");

        conn
          .createChannel(() => {})
          .then((channel, error1) => {
            if (error1) {
              console.error(error1);
              reject(error1);
            }
            console.log("Channel created...");
            channel.assertQueue("product_created", { durable: false });

            channel.consume(
              "product_created",
              async (msg) => {
                console.log("Message received: ", msg.content.toString());
                const newPost = new Post(JSON.parse(msg.content.toString()));
                await newPost.save();
              },
              { noAck: true }
            );

            resolve(connection);
          });
      })
      .catch((error) => {
        console.log("RabbitMQ connection failed. Exiting now...");
        console.error(error);
        reject(error);
      });
  });
}
