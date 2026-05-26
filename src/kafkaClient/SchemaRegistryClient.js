const axios = require('axios');
const config = require('../config/config');

const REGISTRY_URL =
  config.schemaRegistry?.url;

  
  

class SchemaRegistryClient {

  

  // ─────────────────────────────────────────
  // HEALTH CHECK
  // ─────────────────────────────────────────
  static async healthCheck() {
    try {

      const response =
        await axios.get(
          `${REGISTRY_URL}/subjects`,
          {
            auth: {
              username:
                config.schemaRegistry.username,

              password:
                config.schemaRegistry.password
            },

            timeout: 30000
          }
        );

      console.log(
        '✅ Schema Registry Connected'
      );

      return true;

    } catch (error) {

      console.error(
        '❌ Schema Registry Not Reachable:',
        error.response?.data ||
        error.message
      );

      return false;
    }
  }

  // ─────────────────────────────────────────
  // AVRO
  // ─────────────────────────────────────────
  static avroSchema() {
    return {
      schemaType: 'AVRO',
      schema: JSON.stringify({
        type: 'record',
        name: 'IoTSensor',
        namespace: 'com.iot.sensor',
        fields: [
          { name: 'deviceId', type: 'string' },
          { name: 'deviceName', type: 'string' },
          { name: 'temperature', type: 'int' },
          { name: 'humidity', type: 'int' },
          { name: 'pressure', type: 'int' },
          { name: 'status', type: 'string' },
          { name: 'timestamp', type: 'string' }
        ]
      })
    };
  }

  // ─────────────────────────────────────────
  // NESTED AVRO
  // ─────────────────────────────────────────
  static nestedAvroSchema() {
    return {
      schemaType: 'AVRO',
      schema: JSON.stringify({
        type: 'record',
        name: 'IoTSensor',
        namespace: 'com.iot.sensor',
        fields: [
          { name: 'deviceId', type: 'string' },
          { name: 'deviceName', type: 'string' },
          { name: 'temperature', type: 'int' },
          { name: 'humidity', type: 'int' },
          { name: 'pressure', type: 'int' },
          { name: 'status', type: 'string' },
          { name: 'timestamp', type: 'string' },

          {
            name: 'location',
            type: {
              type: 'record',
              name: 'Location',
              fields: [
                { name: 'latitude', type: 'string' },
                { name: 'longitude', type: 'string' }
              ]
            }
          },

          {
            name: 'battery',
            type: {
              type: 'record',
              name: 'Battery',
              fields: [
                { name: 'level', type: 'int' },
                { name: 'voltage', type: 'string' }
              ]
            }
          },

          {
            name: 'deviceHealth',
            type: {
              type: 'record',
              name: 'DeviceHealth',
              fields: [
                {
                  name: 'signalStrength',
                  type: 'int'
                },
                {
                  name: 'networkType',
                  type: 'string'
                },
                {
                  name: 'firmwareVersion',
                  type: 'string'
                }
              ]
            }
          }
        ]
      })
    };
  }

  // ─────────────────────────────────────────
  // PROTOBUF
  // ─────────────────────────────────────────
  static protobufSchema() {
    return {
      schemaType: 'PROTOBUF',
      schema: `
syntax = "proto3";

package com.iot.sensor;

message IoTSensor {
  string deviceId = 1;
  string deviceName = 2;
  int32 temperature = 3;
  int32 humidity = 4;
  int32 pressure = 5;
  string status = 6;
  string timestamp = 7;
}
`
    };
  }

  // ─────────────────────────────────────────
  // NESTED PROTOBUF
  // ─────────────────────────────────────────
  static nestedProtobufSchema() {
    return {
      schemaType: 'PROTOBUF',
      schema: `
syntax = "proto3";

package com.iot.sensor;

message Location {
  string latitude = 1;
  string longitude = 2;
}

message Battery {
  int32 level = 1;
  string voltage = 2;
}

message DeviceHealth {
  int32 signalStrength = 1;
  string networkType = 2;
  string firmwareVersion = 3;
}

message IoTSensor {
  string deviceId = 1;
  string deviceName = 2;
  int32 temperature = 3;
  int32 humidity = 4;
  int32 pressure = 5;
  string status = 6;
  string timestamp = 7;

  Location location = 8;
  Battery battery = 9;
  DeviceHealth deviceHealth = 10;
}
`
    };
  }

  // ─────────────────────────────────────────
  // JSON
  // ─────────────────────────────────────────
  static jsonSchema() {
    return {
      schemaType: 'JSON',
      schema: JSON.stringify({
        type: 'object',
        properties: {
          deviceId: { type: 'string' },
          deviceName: { type: 'string' },
          temperature: { type: 'integer' },
          humidity: { type: 'integer' },
          pressure: { type: 'integer' },
          status: { type: 'string' },
          timestamp: { type: 'string' }
        }
      })
    };
  }

  // ─────────────────────────────────────────
  // NESTED JSON
  // ─────────────────────────────────────────
  static nestedJsonSchema() {
    return {
      schemaType: 'JSON',
      schema: JSON.stringify({
        type: 'object',
        properties: {
          deviceId: { type: 'string' },
          deviceName: { type: 'string' },
          temperature: { type: 'integer' },
          humidity: { type: 'integer' },
          pressure: { type: 'integer' },
          status: { type: 'string' },
          timestamp: { type: 'string' },

          location: {
            type: 'object',
            properties: {
              latitude: {
                type: 'string'
              },
              longitude: {
                type: 'string'
              }
            }
          },

          battery: {
            type: 'object',
            properties: {
              level: {
                type: 'integer'
              },
              voltage: {
                type: 'string'
              }
            }
          },

          deviceHealth: {
            type: 'object',
            properties: {
              signalStrength: {
                type: 'integer'
              },
              networkType: {
                type: 'string'
              },
              firmwareVersion: {
                type: 'string'
              }
            }
          }
        }
      })
    };
  }

  // ─────────────────────────────────────────
  // STRING
  // ─────────────────────────────────────────
  static stringSchema() {
    return {
      schemaType: 'JSON',
      schema: JSON.stringify({
        type: 'string'
      })
    };
  }

  // ─────────────────────────────────────────
  // NESTED STRING
  // ─────────────────────────────────────────
  static nestedStringSchema() {
    return {
      schemaType: 'JSON',
      schema: JSON.stringify({
        type: 'object',
        properties: {
          deviceId: {
            type: 'string'
          },
          status: {
            type: 'string'
          },
          timestamp: {
            type: 'string'
          }
        }
      })
    };
  }

  // ─────────────────────────────────────────
  // REGISTER SCHEMA
  // ─────────────────────────────────────────
  static async register(
    subject,
    schemaPayload
  ) {
    try {

      const response =
        await axios.post(
          `${REGISTRY_URL}/subjects/${subject}/versions`,
          schemaPayload,
          {
            headers: {
              'Content-Type':
                'application/vnd.schemaregistry.v1+json'
            },

            auth: {
              username:
                config.schemaRegistry.username,

              password:
                config.schemaRegistry.password
            },

            timeout: 30000
          }
        );

      console.log(
        `✅ Schema registered:
${subject}
(id: ${response.data.id})`
      );

      return response.data.id;

    } catch (error) {

      console.error(
        `❌ Failed schema:
${subject}`
      );

      console.error(
        error.response?.data ||
        error.message
      );
    }
  }

  // ─────────────────────────────────────────
  // REGISTER ALL
  // ─────────────────────────────────────────
  static async registerAll() {

    const isHealthy =
      await this.healthCheck();

    if (!isHealthy) {
      console.log(
        '❌ Stopping schema registration'
      );
      return;
    }

    await this.register(
      'iot-sensor-avro-value',
      this.avroSchema()
    );

    await this.register(
      'iot-sensor-nested-avro-value',
      this.nestedAvroSchema()
    );

    await this.register(
      'iot-sensor-protobuf-value',
      this.protobufSchema()
    );

    await this.register(
      'iot-sensor-nested-protobuf-value',
      this.nestedProtobufSchema()
    );

    await this.register(
      'iot-sensor-json-value',
      this.jsonSchema()
    );

    await this.register(
      'iot-sensor-nested-json-value',
      this.nestedJsonSchema()
    );

    await this.register(
      'iot-sensor-string-value',
      this.stringSchema()
    );

    await this.register(
      'iot-sensor-nested-string-value',
      this.nestedStringSchema()
    );

    console.log(
      '✅ All schemas registered successfully'
    );
  }
}

module.exports = SchemaRegistryClient;