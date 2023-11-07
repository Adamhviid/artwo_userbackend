import RabbitMQ from "../startup_rabbitMQ.js";

export default async function Post(post) {
  try {
    const connection = await RabbitMQ();
    const channel = await connection.createChannel();
    channel.sendToQueue("product_created", Buffer.from(JSON.stringify(post)));
    console.log("Message sent to product_created");
  } catch (error) {
    console.error(error);
  }
}
