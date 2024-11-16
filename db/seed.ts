  // db/seed.ts
  import { db, User, Role, Post, PostImage, Comment } from 'astro:db';

  export default async function() {
    // Insertar roles
    await db.insert(Role).values([
      { id: '1', name: 'admin' },
      { id: '2', name: 'user' },
      { id: '3', name: 'moderator' }, // Nuevo rol
    ]);

    // Insertar usuarios
    await db.insert(User).values([
      { id: 'user1', username: 'jdm_legend', email: 'jdm_legend@example.com', password: 'hashed_password_1', role: '1' },
      { id: 'user2', username: 'boost_junkie', email: 'boost_junkie@example.com', password: 'hashed_password_2', role: '2' },
      { id: 'user3', username: 'night_rider', email: 'night_rider@example.com', password: 'hashed_password_3', role: '2' },
      { id: 'user4', username: 'drift_king', email: 'drift_king@example.com', password: 'hashed_password_4', role: '2' },
      { id: 'user5', username: 'tuning_master', email: 'tuning_master@example.com', password: 'hashed_password_5', role: '3' }, // Nuevo usuario con rol de moderador
    ]);

    // Insertar publicaciones (posts)
    await db.insert(Post).values([
      { id: 'post1', userId: 'user1', content: 'Restauración completa de mi AE86, ¡como en Initial D!', imageUrl: 'https://www.motortrend.com/uploads/f/205012862.jpg' },
      { id: 'post2', userId: 'user2', content: '¿Quién va al JDM meet este fin de semana? Llevaré mi Evo IX recién tuneado.', imageUrl: 'https://i.pinimg.com/564x/e2/2c/87/e22c875f6559035e04dfe7bdba00ae42.jpg' },
      { id: 'post3', userId: 'user3', content: '¡Listo para la próxima carrera nocturna con mi Skyline R34!', imageUrl: 'https://images.collectingcars.com/065087/DSC06564.jpg?w=1263&fit=fillmax&crop=edges&auto=format,compress&cs=srgb&q=85' }, // Nueva publicación
      { id: 'post4', userId: 'user4', content: 'Mi Supra ha recibido un nuevo kit de turbo, ¡esperen los tiempos de vuelta más rápidos!', imageUrl: 'https://i.pinimg.com/736x/11/fd/05/11fd057b474fffbf084c74099abfc78e.jpg' }, // Nueva publicación
      { id: 'post5', userId: 'user5', content: 'Realizando modificaciones en el motor de un Civic EK9, ¡próximamente más detalles!', imageUrl: 'https://allthingzjdm.com/cdn/shop/files/448430750_1005220864628867_2965578774528955142_n.jpg?v=1718589371&width=1946' }, // Nueva publicación
    ]);

    // Insertar imágenes adicionales para posts
    await db.insert(PostImage).values([
      { id: 'img1', postId: 'post1', imageUrl: 'https://www.motortrend.com/uploads/f/205012862.jpg' },
      { id: 'img2', postId: 'post2', imageUrl: 'https://i.pinimg.com/564x/e2/2c/87/e22c875f6559035e04dfe7bdba00ae42.jpg' }, // Nueva imagen
      { id: 'img3', postId: 'post3', imageUrl: 'https://images.collectingcars.com/065087/DSC06564.jpg?w=1263&fit=fillmax&crop=edges&auto=format,compress&cs=srgb&q=85' }, // Nueva imagen
      { id: 'img4', postId: 'post4', imageUrl: 'https://i.pinimg.com/736x/11/fd/05/11fd057b474fffbf084c74099abfc78e.jpg' }, // Nueva imagen
      { id: 'img5', postId: 'post5', imageUrl: 'https://allthingzjdm.com/cdn/shop/files/448430750_1005220864628867_2965578774528955142_n.jpg?v=1718589371&width=1946' }, // Nueva imagen
    ]);

    // Insertar comentarios
    await db.insert(Comment).values([
      { id: 'comment1', postId: 'post1', userId: 'user2', content: '¡Se ve increíble!' },
      { id: 'comment2', postId: 'post2', userId: 'user1', content: 'Nos vemos allá.' },
      { id: 'comment3', postId: 'post3', userId: 'user4', content: '¡Esa es la actitud! No te dejes alcanzar.' }, // Nuevo comentario
      { id: 'comment4', postId: 'post4', userId: 'user5', content: '¡Suena brutal, amigo! Ya quiero ver esos tiempos.' }, // Nuevo comentario
      { id: 'comment5', postId: 'post5', userId: 'user2', content: '¡Vas a romperla con ese Civic! ¿Qué cambios le hiciste al motor?' }, // Nuevo comentario
    ]);
  }
