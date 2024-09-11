const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
// Một biến ghi nhận tin nhắn và lưu trữ tại socket chỉ reset khi soket đóng.
let messages = [];

server.on('connection', socket => {
  // Gửi tất cả các tin nhắn cũ cho client mới kết nối
  messages.forEach((message) => {
    socket.send(message);
  });

  socket.on('message', message => {
    // Lưu trữ tin nhắn mới
    messages.push(message);

    // Gửi tin nhắn đến tất cả các kết nối
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log('WebSocket server is running on ws://localhost:8080');