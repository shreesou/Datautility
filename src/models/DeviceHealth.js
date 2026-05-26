class DeviceHealth {
  constructor(signalStrength, networkType, firmwareVersion) {
    this.signalStrength = signalStrength;
    this.networkType = networkType;
    this.firmwareVersion = firmwareVersion;
  }
}

module.exports = DeviceHealth;