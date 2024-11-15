// db/seed.ts
import { db, User, Role, Post, PostImage, Comment } from 'astro:db';

export default async function() {
  // Insertar roles
  await db.insert(Role).values([
    { id: '1', name: 'admin' },
    { id: '2', name: 'user' },
  ]);

  // Insertar usuarios
  await db.insert(User).values([
    { id: 'user1', username: 'jdm_legend', email: 'jdm_legend@example.com', password: 'hashed_password_1', role: '1' },
    { id: 'user2', username: 'boost_junkie', email: 'boost_junkie@example.com', password: 'hashed_password_2', role: '2' },
  ]);

  // Insertar publicaciones (posts)
  await db.insert(Post).values([
    { id: 'post1', userId: 'user1', content: 'Restauración completa de mi AE86, ¡como en Initial D!', imageUrl: 'https://example.com/ae86.jpg' },
    { id: 'post2', userId: 'user2', content: '¿Quién va al JDM meet este fin de semana? Llevaré mi Evo IX recién tuneado.', imageUrl: '' },
  ]);

  // Insertar imágenes adicionales para posts
  await db.insert(PostImage).values([
    { id: 'img1', postId: 'post1', imageUrl: 'https://example.com/ae86_detail.jpg' },
  ]);

  // Insertar comentarios
  await db.insert(Comment).values([
    { id: 'comment1', postId: 'post1', userId: 'user2', content: '¡Se ve increíble!' },
    { id: 'comment2', postId: 'post2', userId: 'user1', content: 'Nos vemos allá.' },
  ]);
}
