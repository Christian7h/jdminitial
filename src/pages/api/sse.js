//src/pages/api/sse.js
import express from 'express';
import { db, Post } from '../../../db/config'; // Importa tu base de datos

const app = express();
const port = 4321;

// Configuración de SSE
app.get('/api/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Función para enviar los posts más recientes
  const sendPosts = async () => {
    const posts = await db.select().from(Post).orderBy('createdAt DESC');
    res.write(`data: ${JSON.stringify(posts)}\n\n`);
  };

  sendPosts(); // Enviar los posts iniciales al cliente

  const intervalId = setInterval(sendPosts, 5000); // Enviar actualizaciones cada 5 segundos

  // Limpiar cuando se cierre la conexión
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

// Configurar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
