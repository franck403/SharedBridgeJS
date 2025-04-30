class SharedBridge {
  constructor(name) {
    // set bridge name
    this.name = name
    // generate the peerId
    this.id = `SharedBridgeJS${location.origin}${name}`
  }
}
