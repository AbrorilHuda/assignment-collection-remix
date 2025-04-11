import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "upload_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET || "supersecret"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // 15 menit
    httpOnly: true,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
