import { lucia } from "../../auth";
import type { APIContext } from "astro";
import { db, eq, User, Role } from "astro:db";
import { Argon2id } from "oslo/password";

// Función para actualizar el rol del usuario si han pasado 3 meses desde su registro
async function updateUserRoleIfNeeded(userId: string) {
  const foundUser = (await db.select().from(User).where(eq(User.id, userId)))[0];

  if (!foundUser) {
    return;
  }

  // Verificar si han pasado 3 meses desde la fecha de creación
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const createdAt = new Date(foundUser.created_at);
  if (createdAt <= threeMonthsAgo && foundUser.roleId === "1") {
    // Si han pasado 3 meses y el rol es "principiante" (roleId = 1), actualizamos a "intermedio" (roleId = 2)
    await db.update(User).set({ roleId: "2" }).where(eq(User.id, userId));
  }
}

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
        "Location": "/signin?error=Invalid username or password",
      },
    });
  }

  // Buscar el usuario
  const foundUser = (
    await db.select().from(User).where(eq(User.username, username))
  )[0];

  if (!foundUser) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signin?error=Incorrect username or password",
      },
    });
  }

  // Verificar la contraseña
  if (foundUser.password === null) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signin?error=Incorrect username or password",
      },
    });
  }

  const validPassword = await new Argon2id().verify(
    foundUser.password,
    password
  );

  if (!validPassword) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signin?error=Incorrect username or password",
      },
    });
  }

  // Actualizar el rol si es necesario
  await updateUserRoleIfNeeded(foundUser.id);

  // Crear sesión
  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // Obtener el rol del usuario actualizado
  const userRole = (
    await db.select().from(Role).where(eq(Role.id, Role.id))
  )[0];


  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/",
    },
  });
}
