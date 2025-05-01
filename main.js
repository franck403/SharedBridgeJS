class SharedBridge {
  constructor(name) {
    this.name = name;
    this.id = `SharedBridgeJS_${location.origin}_${name}`;
    this.peer = null;
    this.connection = null;

    // Setup after DOM is ready
    this._init();
  }

  _init() {
    // Ensure PeerJS is loaded
    if (typeof Peer === 'undefined') {
      console.error('PeerJS is not loaded. Include it with a <script> tag.');
      return;
    }

    // Check localStorage for a peer ID
    const storedId = localStorage.getItem(this.id);

    if (storedId) {
      this._connectToPeer(storedId);
    } else {
      this._createPeer();
    }
  }

  _createPeer() {
    const newPeerId = `${this.id}_${Math.random().toString(36).slice(2, 8)}`;
    this.peer = new Peer(newPeerId);

    this.peer.on('open', (id) => {
      console.log(`[SharedBridge] New peer created with ID: ${id}`);
      localStorage.setItem(this.id, id);
    });

    this.peer.on('connection', (conn) => {
      console.log('[SharedBridge] Incoming connection');
      this.connection = conn;
      this._setupConnection();
    });

    this._setupPeerEvents();
  }

  _connectToPeer(peerId) {
    const tempPeer = new Peer(); // create temporary peer to initiate connection

    tempPeer.on('open', (id) => {
      console.log(`[SharedBridge] Connecting to existing peer: ${peerId}`);
      const conn = tempPeer.connect(peerId);

      conn.on('open', () => {
        console.log('[SharedBridge] Connected to existing peer');
        this.peer = tempPeer;
        this.connection = conn;
        this._setupConnection();
      });

      conn.on('error', (err) => {
        console.warn('[SharedBridge] Connection error. Creating new peer.', err);
        tempPeer.destroy();
        localStorage.removeItem(this.id);
        this._createPeer();
      });

      conn.on('close', () => {
        console.warn('[SharedBridge] Connection closed. Creating new peer.');
        tempPeer.destroy();
        localStorage.removeItem(this.id);
        this._createPeer();
      });
    });

    this._setupPeerEvents(tempPeer);
  }

  _setupConnection() {
    this.connection.on('data', (data) => {
      console.log('[SharedBridge] Received data:', data);
      // Handle incoming data here
    });

    this.connection.on('close', () => {
      console.log('[SharedBridge] Connection closed.');
    });
  }

  _setupPeerEvents(peerInstance = this.peer) {
    peerInstance.on('disconnected', () => {
      console.warn('[SharedBridge] Peer disconnected. Reconnecting...');
      peerInstance.reconnect();
    });

    peerInstance.on('error', (err) => {
      console.error('[SharedBridge] Peer error:', err);
    });

    peerInstance.on('close', () => {
      console.warn('[SharedBridge] Peer closed.');
    });
  }

  send(data) {
    if (this.connection && this.connection.open) {
      this.connection.send(data);
    } else {
      console.warn('[SharedBridge] No open connection to send data.');
    }
  }
}
