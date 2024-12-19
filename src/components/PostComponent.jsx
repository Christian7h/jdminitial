// src/components/PostComponent.jsx

const PostComponent = ({ post, user, comments, role }) => {
  const sortedComments = comments.sort((a, b) => new Date(b.Comment.createdAt) - new Date(a.Comment.createdAt));

  return (
    <article id={`post-${post.id}`} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <strong className="text-red-600">
            @{user?.username || "Usuario desconocido"} - {""}
            {role?.name || "Rol desconocido"}  
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
          className="w-full h-72 object-cover rounded-lg mb-4"
        />
      )}

      <footer>
        <div className="mt-4">
          <h3 className="text-xl text-white font-semibold mb-2">Comentarios:</h3>
          {sortedComments.length === 0 ? (
            <p className="text-white text-sm">No hay comentarios aún.</p>
          ) : (
            sortedComments.map((comment) => (
              <div key={comment.Comment.id} className="bg-gray-700 p-4 rounded-lg mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <strong className="text-red-600">
                    @{comment.User.username || "Usuario desconocido"} - {""}
                    {comment.Role?.name || "Rol desconocido"}
                  </strong>
                  <span className="text-gray-400 text-sm">
                    {new Date(comment.Comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-white">{comment.Comment.content}</p>
              </div>
            ))
          )}
        </div>
      </footer>
    </article>
  );
};

export default PostComponent;
