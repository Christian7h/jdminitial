import { lucia } from "../../auth";
import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { Argon2id } from "oslo/password";

export async function POST(context: APIContext): Promise<Response> {
  // Leer los datos del formulario
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  // Validar los datos
  if (typeof username !== "string") {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signin?error=Invalid username",
      },
    });
  }
  if (typeof password !== "string") {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signin?error=Invalid password",
      },
    });
  }

  // Buscar el usuario
  const foundUser = (
    await db.select().from(User).where(eq(User.username, username))
  ).at(0);

  // Si no se encuentra el usuario
  if (!foundUser) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signin?error=Incorrect username or password",
      },
    });
  }

  // Verificar si el usuario tiene contraseña
  if (!foundUser.password) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signin?error=Invalid password",
      },
    });
  }

  const validPassword = await new Argon2id().verify(
    foundUser.password,
    password
  );

  // Si la contraseña no es válida
  if (!validPassword) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signin?error=Incorrect username or password",
      },
    });
  }

  // La contraseña es válida, el usuario puede iniciar sesión
  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/");
}
