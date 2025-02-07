const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Lista de clientes conectados (opcional)
const mensajes = [];

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Enviar historial de mensajes al nuevo cliente
  socket.emit('historialMensajes', mensajes);

  // Escuchar mensajes entrantes
  socket.on('nuevoMensaje', (msg) => {
    console.log(`Mensaje recibido de ${socket.id}:`, msg);
    mensajes.push(msg); // Guardar el mensaje en la lista

    // Enviar el mensaje a todos los clientes
    io.emit('nuevoMensaje', msg);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
