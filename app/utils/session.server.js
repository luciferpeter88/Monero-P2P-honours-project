// /* eslint-disable no-undef */
// import { createCookieSessionStorage } from "@remix-run/node";

// // Create a session storage
// export const sessionStorage = createCookieSessionStorage({
//   cookie: {
//     name: "auth_session",
//     secrets: ["your-secret-key"], // Change this to a real secret
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 10, // Expires in 10 minutes
//   },
// });

// session.server.js
import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session", // A cookie neve
    httpOnly: true, // A kliens ne férjen hozzá a cookie tartalmához JavaScriptből
    path: "/", // Az egész alkalmazásra érvényes cookie
    sameSite: "lax", // Biztonsági beállítások
    secrets: ["my-super-secret-key"], // Legalább egy titkos kulcs a session aláírásához
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === "production", // Csak HTTPS esetén küldje el a cookie-t
  },
});

// Exportáljuk a session kezeléséhez szükséges függvényeket
export const { getSession, commitSession, destroySession } = sessionStorage;
