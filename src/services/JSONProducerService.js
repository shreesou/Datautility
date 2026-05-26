const config = require('../config/config');
const RandomSensorDataGenerator = require('../util/RandomSensorDataGenerator');

class JSONProducerService {

  constructor(producerClient) {
    this.producerClient = producerClient;
  }

  async publish() {
    console.log('Publishing message...');

    const sensorData = RandomSensorDataGenerator.generate();

    console.log('Generated Sensor Data:', sensorData);

    await this.producerClient.send(
      config.topics.jsonTopic,
      sensorData
    );
  }
}

module.exports = JSONProducerService;