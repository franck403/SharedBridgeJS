# SharedBridgeJS

**SharedBridgeJS** is a lightweight JavaScript API that lets two identical websites (or same-origin pages) communicate and sync data — even when browsers isolate storage (e.g., partitioning or incognito mode).

---

## 🚀 Features

- 🔗 Communicate between same-origin tabs, iframes, or windows
- 📦 Sync state without relying on localStorage or IndexedDB
- 🧩 Works with partitioned storage
- ⚡ Lightweight and fast (no dependencies)

---

## 📦 Install via CDN
Recommanded : 
 [jsDelivr CDN](https://cdn.jsdelivr.net):

```html
<script src="https://cdn.jsdelivr.net/gh/franck403/SharedBridgeJS@latest/main.js"></script>
```

---

## 🧪 Example

Here’s how you can use **SharedBridgeJS** to send and receive messages between browser tabs or windows:

```html
<!DOCTYPE html>
<html>
<head>
  <title>SharedBridgeJS Demo</title>
  <script src="https://cdn.jsdelivr.net/gh/franck403/SharedBridgeJS@latest/dist/sharedbridge.min.js"></script>
</head>
<body>
  <h1>SharedBridgeJS Example</h1>
  <input type="text" id="msg" placeholder="Type a message..." />
  <button onclick="sendMessage()">Send to Other Tabs</button>

  <script>
    // Initialize the bridge
    const bridge = new SharedBridge('shared-demo');

    // Handle incoming messages
    bridge.onMessage((data) => {
      alert('Received message: ' + JSON.stringify(data));
    });

    // Send a message
    function sendMessage() {
      const text = document.getElementById('msg').value;
      bridge.send({ message: text });
    }
  </script>
</body>
</html>
```

Open this page in two tabs to see real-time communication.

---

## 📚 API Documentation

### `new SharedBridge(channelName: string)`

Create a bridge on a shared communication channel.

#### Parameters:
- `channelName` (string): A name used by both sites or tabs to connect.

---

### `.onMessage(callback: Function)`

Sets a function that triggers when a message is received.

#### Parameters:
- `callback` (Function): A function that takes a single argument (`data`) which is the received message object.

#### Example:
```js
bridge.onMessage((data) => {
  console.log('Got:', data);
});
```

---

### `.send(data: any)`

Broadcast a message to all other open contexts using the same channel.

#### Parameters:
- `data` (any): The object or value to send. Must be serializable.

#### Example:
```js
bridge.send({ status: 'active' });
```

---

### `.close()`

Closes the communication channel and stops listening for messages.

#### Example:
```js
bridge.close();
```

---

## 🌐 Supported Browsers

| Browser        | Works? |
|----------------|--------|
| Chrome         | ✅     |
| Firefox        | N/A    |
| Safari         | N/A    |
| Edge           | N/A    |
| Mobile Browsers| N/A    |

---

## 📂 Use Cases

- Syncing theme or user state between tabs
- Communicating between same-origin iframes
- Replacing `localStorage` sync methods in restricted or isolated environments
- Supporting web apps in incognito or privacy modes

---

## 🧩 Project Repository

🔗 GitHub: [https://github.com/franck403/SharedBridgeJS](https://github.com/franck403/SharedBridgeJS)

---

## 📄 License

MIT © 2025 [Franck403](https://github.com/franck403)
