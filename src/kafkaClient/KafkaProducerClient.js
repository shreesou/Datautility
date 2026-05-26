const { Kafka } = require('kafkajs');
const config = require('../config/config');

console.log('Config loaded:', config); // ADD THIS TEMPORARILY

class KafkaProducerClient {

  constructor() {
    this.kafka = new Kafka({
      clientId: config.kafka.clientId,
      brokers: [config.kafka.bootstrapServer]
    });

    this.producer = this.kafka.producer();
  }

  async connect() {
    await this.producer.connect();
    console.log('✅ Kafka Producer Connected');
  }

  async send(topic, message) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }]
    });
    console.log(`✅ Message sent to topic: ${topic}`);
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}

module.exports = KafkaProducerClient;