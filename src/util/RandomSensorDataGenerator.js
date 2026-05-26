const SensorData = require('../models/SensorData');
const Location = require('../models/Location');
const Battery = require('../models/Battery');
const DeviceHealth = require('../models/DeviceHealth');

class RandomSensorDataGenerator {

  static generate() {

    const location = new Location(
      (Math.random() * 180 - 90).toFixed(6),
      (Math.random() * 360 - 180).toFixed(6)
    );

    const battery = new Battery(
      Math.floor(Math.random() * 100),
      (Math.random() * (4.5 - 3.5) + 3.5).toFixed(2)
    );

    const deviceHealth = new DeviceHealth(
      Math.floor(Math.random() * -100),
      ['4G', '5G', 'WiFi', 'BSNL'][Math.floor(Math.random() * 4)],
      `v${Math.floor(Math.random() * 3)}.${Math.floor(Math.random() * 10)}`
    );

    return new SensorData(
      `IOT-${Math.floor(Math.random() * 10000)}`,
      Math.floor(Math.random() * 50),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 1050),
      battery,
      location,
      deviceHealth,
      ['ONLINE', 'OFFLINE'][Math.floor(Math.random() * 2)],
      new Date().toISOString()
    );
  }
}

module.exports = RandomSensorDataGenerator;