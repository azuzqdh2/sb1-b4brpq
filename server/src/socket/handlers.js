export const setupSocketHandlers = (io) => {
  const users = new Map();

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('user:join', ({ userId }) => {
      users.set(userId, socket.id);
      socket.broadcast.emit('user:online', { userId });
    });

    socket.on('message:send', async (message) => {
      const recipientSocket = users.get(message.recipientId);
      if (recipientSocket) {
        io.to(recipientSocket).emit('message:receive', message);
      }
    });

    socket.on('typing:start', ({ chatId, userId }) => {
      socket.to(chatId).emit('typing:update', { userId, isTyping: true });
    });

    socket.on('typing:stop', ({ chatId, userId }) => {
      socket.to(chatId).emit('typing:update', { userId, isTyping: false });
    });

    socket.on('disconnect', () => {
      let userId;
      for (const [key, value] of users.entries()) {
        if (value === socket.id) {
          userId = key;
          break;
        }
      }
      if (userId) {
        users.delete(userId);
        io.emit('user:offline', { userId });
      }
    });
  });
};