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
  // Fixed: removed 'deviceName' field to match
  // the originally registered schema
  // ─────────────────────────────────────────
  static avroSchema() {
    return {
      schemaType: 'AVRO',
      schema: JSON.stringify({
        doc: 'IoT Sensor Data Schema',
        type: 'record',
        name: 'IoTSensor',
        namespace: 'com.iot.sensor',
        fields: [
          { name: 'deviceId',    type: 'string', doc: 'Unique device identifier' },
          { name: 'temperature', type: 'int',    doc: 'Temperature in Celsius' },
          { name: 'humidity',    type: 'int',    doc: 'Humidity percentage' },
          { name: 'pressure',    type: 'int',    doc: 'Atmospheric pressure' },
          { name: 'status',      type: 'string', doc: 'Sensor status' },
          { name: 'timestamp',   type: 'string', doc: 'Event timestamp' }
        ]
      })
    };
  }

  // ─────────────────────────────────────────
  // NESTED AVRO
  // Fixed: removed 'deviceName' field to match
  // the originally registered schema
  // ─────────────────────────────────────────
  static nestedAvroSchema() {
    return {
      schemaType: 'AVRO',
      schema: JSON.stringify({
        doc: 'IoT Sensor Nested Data Schema',
        type: 'record',
        name: 'IoTSensor',
        namespace: 'com.iot.sensor',
        fields: [
          { name: 'deviceId',    type: 'string', doc: 'Unique device identifier' },
          { name: 'temperature', type: 'int',    doc: 'Temperature in Celsius' },
          { name: 'humidity',    type: 'int',    doc: 'Humidity percentage' },
          { name: 'pressure',    type: 'int',    doc: 'Atmospheric pressure' },
          { name: 'status',      type: 'string', doc: 'Sensor status' },
          { name: 'timestamp',   type: 'string', doc: 'Event timestamp' },

          {
            name: 'location',
            doc: 'Geographic location of sensor',
            type: {
              type: 'record',
              name: 'Location',
              fields: [
                { name: 'latitude',  type: 'string' },
                { name: 'longitude', type: 'string' }
              ]
            }
          },

          {
            name: 'battery',
            doc: 'Battery information',
            type: {
              type: 'record',
              name: 'Battery',
              fields: [
                { name: 'level',   type: 'int' },
                { name: 'voltage', type: 'string' }
              ]
            }
          },

          {
            name: 'deviceHealth',
            doc: 'Device health metrics',
            type: {
              type: 'record',
              name: 'DeviceHealth',
              fields: [
                { name: 'signalStrength',   type: 'int' },
                { name: 'networkType',      type: 'string' },
                { name: 'firmwareVersion',  type: 'string' }
              ]
            }
          }
        ]
      })
    };
  }

  // ─────────────────────────────────────────
  // PROTOBUF
  // Fixed: removed 'deviceName' field and
  // restored original tag numbers 1-6
  // ─────────────────────────────────────────
  static protobufSchema() {
    return {
      schemaType: 'PROTOBUF',
      schema: `
syntax = "proto3";

package com.iot.sensor;

message IoTSensor {
  string deviceId    = 1;
  int32  temperature = 2;
  int32  humidity    = 3;
  int32  pressure    = 4;
  string status      = 5;
  string timestamp   = 6;
}
`
    };
  }

  // ─────────────────────────────────────────
  // NESTED PROTOBUF
  // Fixed: removed 'deviceName' field and
  // restored original tag numbers 1-6,
  // nested messages start at tag 7
  // ─────────────────────────────────────────
  static nestedProtobufSchema() {
    return {
      schemaType: 'PROTOBUF',
      schema: `
syntax = "proto3";

package com.iot.sensor;

message Location {
  string latitude  = 1;
  string longitude = 2;
}

message Battery {
  int32  level   = 1;
  string voltage = 2;
}

message DeviceHealth {
  int32  signalStrength  = 1;
  string networkType     = 2;
  string firmwareVersion = 3;
}

message IoTSensor {
  string deviceId    = 1;
  int32  temperature = 2;
  int32  humidity    = 3;
  int32  pressure    = 4;
  string status      = 5;
  string timestamp   = 6;

  Location     location     = 7;
  Battery      battery      = 8;
  DeviceHealth deviceHealth = 9;
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
          deviceId:    { type: 'string' },
          temperature: { type: 'integer' },
          humidity:    { type: 'integer' },
          pressure:    { type: 'integer' },
          status:      { type: 'string' },
          timestamp:   { type: 'string' }
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
          deviceId:    { type: 'string' },
          temperature: { type: 'integer' },
          humidity:    { type: 'integer' },
          pressure:    { type: 'integer' },
          status:      { type: 'string' },
          timestamp:   { type: 'string' },

          location: {
            type: 'object',
            properties: {
              latitude:  { type: 'string' },
              longitude: { type: 'string' }
            }
          },

          battery: {
            type: 'object',
            properties: {
              level:   { type: 'integer' },
              voltage: { type: 'string' }
            }
          },

          deviceHealth: {
            type: 'object',
            properties: {
              signalStrength:  { type: 'integer' },
              networkType:     { type: 'string' },
              firmwareVersion: { type: 'string' }
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
          deviceId:  { type: 'string' },
          status:    { type: 'string' },
          timestamp: { type: 'string' }
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
        `✅ Schema registered:\n${subject}\n(id: ${response.data.id})`
      );

      return response.data.id;

    } catch (error) {

      console.error(
        `❌ Failed schema:\n${subject}`
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
