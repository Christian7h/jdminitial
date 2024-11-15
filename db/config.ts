// db/config.ts
import { column, defineDb, defineTable } from 'astro:db';

// Definición de la tabla de usuarios. En esta tabla se almacenan los datos básicos de cada usuario.
const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),  // ID único para cada usuario, clave primaria
    username: column.text({ unique: true }),  // Nombre de usuario único
    email: column.text({ unique: true }),     // Email único, evita duplicados
    password: column.text(),                  // Contraseña almacenada como hash (debería ser segura)
    createdAt: column.date({ default: new Date() }),  // Fecha de creación, por defecto es la fecha actual
    role: column.text({ references: () => Role.columns.id }), // Relación con la tabla de roles (admin, user, super-user)
  },
});
 
// Definición de la tabla de roles, para gestionar permisos de los usuarios.
const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),  // ID único del rol (clave primaria)
    name: column.text(),  // Nombre del rol, como 'admin', 'user', etc.
  },
});

// Definición de la tabla de publicaciones o posts. Aquí se almacenan los posts de los usuarios.
const Post = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),  // ID único para cada post
    userId: column.text({ references: () => User.columns.id }),  // Relación con la tabla de usuarios (quién creó el post)
    content: column.text(),  // Contenido del post
    imageUrl: column.text(),  // URL de una imagen asociada al post, opcional
    createdAt: column.date({ default: new Date() }),  // Fecha de creación del post
  },
});

// Definición de la tabla de imágenes asociadas a publicaciones. Una publicación puede tener múltiples imágenes.
const PostImage = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),  // ID único para cada imagen
    postId: column.text({ references: () => Post.columns.id }),  // Relación con la tabla de publicaciones
    imageUrl: column.text(),  // URL de la imagen
  },
});

// Definición de la tabla de comentarios en publicaciones. Cada comentario está asociado a un post y un usuario.
const Comment = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),  // ID único para cada comentario
    postId: column.text({ references: () => Post.columns.id }),  // Relación con el post comentado
    userId: column.text({ references: () => User.columns.id }),  // Relación con el usuario que hace el comentario
    content: column.text(),  // Contenido del comentario
    createdAt: column.date({ default: new Date() }),  // Fecha de creación del comentario
  },
});

// Exporta la configuración completa de la base de datos, incluyendo las tablas definidas anteriormente.
export default defineDb({
  tables: {
    User,
    Role,
    Post,
    PostImage,
    Comment,
  },
});
