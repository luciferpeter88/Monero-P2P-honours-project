import { WebSocketServer } from "ws";
import { createServer } from "http";

// Create HTTP server for WebSockets
const server = createServer();
const wss = new WebSocketServer({ server });

// Map to store connected users (userID -> WebSocket)
const users = new Map();

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Handle incoming messages
  ws.on("message", async (data) => {
    try {
      const message = JSON.parse(data);

      const { sender, receiver, text } = message;
      console.log(`Message from ${sender} to ${receiver}: ${text}`);

      // Store user's WebSocket in the map
      users.set(sender, ws);

      // Check if the recipient is online
      const recipientSocket = users.get(receiver);

      if (recipientSocket && recipientSocket.readyState === ws.OPEN) {
        // Send message only to the intended recipient
        recipientSocket.send(JSON.stringify(message));
      }

      // Optionally, send a confirmation back to the sender
      ws.send(JSON.stringify({ status: "sent", message }));
    } catch (error) {
      console.error("WebSocket Error:", error);
    }
  });

  ws.on("close", () => {
    // Remove user from the map when they disconnect
    users.forEach((socket, userID) => {
      if (socket === ws) {
        users.delete(userID);
      }
    });
    console.log("Client disconnected");
  });
});

// Start WebSocket server on port 3000
server.listen(3000, () =>
  console.log("WebSocket Server running on ws://localhost:3000")
);
