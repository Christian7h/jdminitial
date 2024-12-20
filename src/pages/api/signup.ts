import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db, User,eq } from "astro:db";
import { lucia } from "../../auth";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  // Leer los datos del formulario
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  // Validar los datos
  if (typeof username !== "string" || typeof password !== "string") {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signup?error=" + encodeURIComponent("Username y Password son requeridos"),
      },
    });
  }
  // Verificar si el nombre de usuario ya existe
  const existingUser = (
    await db.select().from(User).where(eq(User.username, username))
  )[0];

  // Validar longitud del nombre de usuario
  if (username.length < 4) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signup?error=" + encodeURIComponent("El nombre de usuario debe tener al menos 4 caracteres"),
      },
    });
  }

  // Validar longitud de la contraseña
  if (password.length < 6) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signup?error=" + encodeURIComponent("La contraseña debe tener al menos 6 caracteres"),
      },
    });
  }



  if (existingUser) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signup?error=" + encodeURIComponent("El nombre de usuario ya está registrado"),
      },
    });
  }

  // Insertar el nuevo usuario en la base de datos
  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);

  await db.insert(User).values([
    {
      id: userId,
      username,
      password: hashedPassword,
      roleId: "1", // Asignar rol "principiante" por defecto
      created_at: new Date(),
    },
  ]);

  // Crear sesión para el nuevo usuario
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // Redirigir a la página principal con éxito
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/",
    },
  });
}
