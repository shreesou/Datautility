class SensorData {
  constructor(
    deviceId,
    temperature,
    humidity,
    pressure,
    battery,
    location,
    deviceHealth,
    status,
    timestamp
  ) {
    this.deviceId = deviceId;
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.battery = battery;
    this.location = location;
    this.deviceHealth = deviceHealth;
    this.status = status;
    this.timestamp = timestamp;
  }
}

module.exports = SensorData;