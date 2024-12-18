import React, { useState, useEffect } from 'react';

const PostComponent = ({ post, user, comments }) => {
  const [posts, setPosts] = useState([post]); // Inicializar el estado con el post recibido

  useEffect(() => {
    // Conectar al endpoint SSE
    const eventSource = new EventSource('/api/sse');

    // Al recibir un nuevo post
    eventSource.onmessage = (event) => {
      const newPost = JSON.parse(event.data);
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Agregar el nuevo post al principio
    };

    // Manejar errores de la conexión SSE
    eventSource.onerror = (error) => {
      console.log('Error en la conexión SSE:', error);
      eventSource.close(); // Cerrar la conexión si hay un error
    };

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      eventSource.close();
    };
  }, []); // El useEffect solo se ejecuta una vez cuando se monta el componente

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <strong className="text-red-600">
                @{user?.username || "Usuario desconocido"}
              </strong>
              <span className="text-gray-400 text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </header>

          <p className="text-white mb-4">{post.content}</p>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post image"
              className="w-full h-auto rounded-lg mb-4"
            />
          )}

          <footer>
            <div className="mt-4">
              <h3 className="text-xl text-white font-semibold mb-2">
                Comentarios:
              </h3>
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-700 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <strong className="text-red-600">
                      @{comment.User.username || "Usuario desconocido"}
                    </strong>
                    <span className="text-gray-400 text-sm">
                      {new Date(comment.Comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-white">{comment.Comment.content}</p>
                </div>
              ))}
            </div>
          </footer>
        </article>
      ))}
    </div>
  );
};

export default PostComponent;
