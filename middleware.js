import { getIronSession } from "iron-session";

export async function middleware(req) {
    const res = new Response();

    // Debugging: Check if the password is loaded
    console.log("SECRET_COOKIE_PASSWORD:", process.env.SECRET_COOKIE_PASSWORD);

    const session = await getIronSession(req, res, {
        password: process.env.SECRET_COOKIE_PASSWORD || "fallback_password_1234567890", // Add fallback for debugging
        cookieName: "my-session",
        cookieOptions: { secure: process.env.NODE_ENV === "production" }
    });

    if (!session.user) {
        return Response.redirect(new URL("/signin", req.url));
    }

    return res;
}

// Protect only the main route "/"
export const config = {
    matcher: ["/"],
};
