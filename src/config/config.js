'use strict';

require('dotenv').config();

module.exports = {

  kafka: {

    bootstrapServer:
      process.env.BOOTSTRAP_SERVERS,

    username:
      process.env.SASL_USERNAME,

    password:
      process.env.SASL_PASSWORD,

    clientId:
      'iot-sensor-producer',

    retries: 0,

    connectionTimeout: 3000
  },

  schemaRegistry: {

    url:
      process.env.SCHEMA_REGISTRY_URL,

    username:
      process.env.SCRE_USERNAME,

    password:
      process.env.SCRE_PASSWORD
  },

  topics: {

    stringTopic:
      process.env.KAFKA_STRING_TOPIC,

    jsonTopic:
      process.env.KAFKA_JSON_TOPIC,

    avroTopic:
      process.env.KAFKA_AVRO_TOPIC,

    protoTopic:
      process.env.KAFKA_PROTO_TOPIC
  },

  producer: {

    intervalMs:
      parseInt(
        process.env.INTERVAL_MS || '5000'
      )
  },

  messageFormat:
    process.env.MESSAGE_FORMAT || 'JSON',

  keyRange: {

    min:
      parseInt(
        process.env.MIN_KEY || '1'
      ),

    max:
      parseInt(
        process.env.MAX_KEY || '10'
      )
  }
};
