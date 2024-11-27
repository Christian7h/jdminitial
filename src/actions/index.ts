import { db, Post, PostImage } from "astro:db";
import { v4 as uuidv4 } from 'uuid';

export const server = {
  addPost: async ({ content, imageUrl, userId }: { content: string; imageUrl?: string; userId: string }) => {
    // Generar un ID único para el post
    const postId = uuidv4();

    try {
      // Insertar el post en la base de datos
      await db.insert(Post).values({
        id: postId,
        content,
        userId,
        imageUrl: imageUrl || '',  // Si no hay imagen, dejar vacío
        // createdAt no es necesario si está configurado como valor por defecto en la base de datos
      });

      // Si hay una URL de imagen, agregarla en la tabla PostImage
      if (imageUrl) {
        const postImageId = uuidv4();  // Generar un ID único para la imagen
        await db.insert(PostImage).values({
          id: postImageId,
          postId,
          imageUrl,
        });
      }

      // Confirmación exitosa
      return { success: true };
    } catch (error) {
      // Manejo de errores
      console.error("Error al agregar el post:", error);
      return { success: false, error };
    }
  },
};
