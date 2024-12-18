// src/components/PostsFeed.jsx

import React, { useState, useEffect } from 'react';

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/sse'); // Conectarse al endpoint SSE

    eventSource.onmessage = (event) => {
      const newPost = JSON.parse(event.data);
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Agregar el nuevo post al inicio
    };

    eventSource.onerror = () => {
      console.log('Error en la conexión SSE');
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2 className="text-white text-2xl mb-6">Posts Recientes</h2>
      <div>
        {posts.length === 0 ? (
          <p className="text-white text-center">No hay posts aún. ¡Sé el primero en publicar!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
              <header className="flex items-center justify-between mb-4">
                <strong className="text-red-600">@usuario</strong>
                <span className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleString()}</span>
              </header>
              <p className="text-white mb-4">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostsFeed;
