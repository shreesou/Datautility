const KafkaProducerClient = require('./src/kafkaClient/KafkaProducerClient');
const JSONProducerService = require('./src/services/JSONProducerService');
const SchemaRegistryClient = require('./src/kafkaClient/SchemaRegistryClient');
const config = require('./src/config/config');

async function startProducer() {
  try {
    const producerClient = new KafkaProducerClient();
    await producerClient.connect();

    const producerService = new JSONProducerService(producerClient);

    setInterval(async () => {
      await producerService.publish();
    }, config.producer.intervalMs);

  } catch (error) {
    console.error('Producer Error:', error);
  }
}

async function main() {
 console.log(SchemaRegistryClient);

  await SchemaRegistryClient.registerAll();

  await startProducer();
}

main().catch(console.error);