import { db, User, Post, PostImage, Comment } from "astro:db";
import bcrypt from "bcrypt";

export default async function () {
  try {
    // Insertar usuarios con contraseñas hash
    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("password456", 10);
    const hashedPassword3 = await bcrypt.hash("password789", 10);
    const hashedPassword4 = await bcrypt.hash("password101", 10);
    const hashedPassword5 = await bcrypt.hash("password102", 10);

    await db.insert(User).values([
      { id: "user1", username: "jdm_legend", password: hashedPassword1 },
      { id: "user2", username: "boost_junkie", password: hashedPassword2 },
      { id: "user3", username: "night_rider", password: hashedPassword3 },
      { id: "user4", username: "drift_king", password: hashedPassword4 },
      { id: "user5", username: "tuning_master", password: hashedPassword5 },
    ]);

    // Insertar publicaciones (posts)
    await db.insert(Post).values([
      { id: "post1", userId: "user1", content: "Restauración completa de mi AE86, ¡como en Initial D!", imageUrl: "" },
      { id: "post2", userId: "user2", content: "¿Quién va al JDM meet este fin de semana?", imageUrl: "https://i.pinimg.com/564x/e2/2c/87/e22c875f6559035e04dfe7bdba00ae42.jpg" },
      { id: "post3", userId: "user3", content: "¡Listo para la próxima carrera nocturna con mi Skyline R34!", imageUrl: "https://images.collectingcars.com/065087/DSC06564.jpg?w=1263" },
      { id: "post4", userId: "user4", content: "Mi Supra ha recibido un nuevo kit de turbo", imageUrl: "https://i.pinimg.com/736x/11/fd/05/11fd057b474fffbf084c74099abfc78e.jpg" },
      { id: "post5", userId: "user5", content: "Realizando modificaciones en el motor de un Civic EK9", imageUrl: "https://allthingzjdm.com/cdn/shop/files/448430750_1005220864628867_2965578774528955142_n.jpg?v=1718589371" },
    ]);

    // Insertar imágenes para posts
    await db.insert(PostImage).values([
      { id: "img1", postId: "post1", imageUrl: "https://www.motortrend.com/uploads/f/205012862.jpg" },
      { id: "img2", postId: "post2", imageUrl: "https://i.pinimg.com/564x/e2/2c/87/e22c875f6559035e04dfe7bdba00ae42.jpg" },
      { id: "img3", postId: "post3", imageUrl: "https://images.collectingcars.com/065087/DSC06564.jpg?w=1263" },
      { id: "img4", postId: "post4", imageUrl: "https://i.pinimg.com/736x/11/fd/05/11fd057b474fffbf084c74099abfc78e.jpg" },
      { id: "img5", postId: "post5", imageUrl: "https://allthingzjdm.com/cdn/shop/files/448430750_1005220864628867_2965578774528955142_n.jpg?v=1718589371" },
    ]);

    // Insertar comentarios
    await db.insert(Comment).values([
      { id: "comment1", postId: "post1", userId: "user2", content: "¡Se ve increíble!" },
      { id: "comment2", postId: "post2", userId: "user1", content: "Nos vemos allá." },
      { id: "comment3", postId: "post3", userId: "user4", content: "¡Esa es la actitud!" },
      { id: "comment4", postId: "post4", userId: "user5", content: "¡Suena brutal, amigo!" },
      { id: "comment5", postId: "post5", userId: "user2", content: "¡Vas a romperla con ese Civic!" },
    ]);

    console.log("Base de datos inicializada con datos de prueba.");
  } catch (error) {
    console.error("Error al insertar datos en la base de datos:", error);
  }
}
