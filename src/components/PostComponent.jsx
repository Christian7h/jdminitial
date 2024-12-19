//src/components/PostComponent.jsx
import { useState, useEffect } from 'react';

const PostComponent = ({ user, comments }) => {
  const [posts, setPosts] = useState([]);  // Estado para almacenar los posts

  useEffect(() => {
    // Crear una conexión SSE
    const eventSource = new EventSource('http://localhost:3000/api/sse');
    
    // Escuchar los eventos "message" enviados por el servidor
    eventSource.onmessage = function(event) {
      const data = JSON.parse(event.data);  // Parsea los datos recibidos

      // Actualiza el estado con los nuevos posts
      setPosts(data.rows);
    };

    // Manejo de errores SSE
    eventSource.onerror = function(event) {
      console.error("Error al conectar con el servidor SSE:", event);
    };

    // Cerrar la conexión SSE cuando el componente se desmonte
    return () => {
      eventSource.close();
    };
  }, []);  // Este efecto se ejecuta una sola vez cuando el componente se monta

  return (
    <div>
      {posts.map((post) => (
        <article
          key={post[0]}  // Asumimos que post[0] es el ID único
          id={`post-${post[0]}`}
          className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6"
        >
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <strong className="text-red-600">
                @{user?.username || "Usuario desconocido"}
              </strong>
              <span className="text-gray-400 text-sm">
                {new Date(post[4]).toLocaleString()} {/* Suponemos que post[4] es createdAt */}
              </span>
            </div>
          </header>

          <p className="text-white mb-4">{post[2]}</p> {/* Suponemos que post[2] es el contenido */}
          
          {post[3] && (
            <img
              src={post[3]}  // Suponemos que post[3] es imageUrl
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
