module.exports = {
  kafka: {
    bootstrapServer: 'my-cluster-kafka-bootstrap.kafka.svc:9092',
    clientId: 'iot-sensor-producer'
  },

 schemaRegistry: {
    url: 'http://karapace-schema-registry.schema-registry:8081',


    username:
    '99x0xtckkeui7c0hieyaczouv',

  password:
    'K0j3FtOrXIDW2YZ'

},

  topics: {
    jsonTopic: 'iot-sensor-avro'
  },

  producer: {
    intervalMs: 5000
  }
};
