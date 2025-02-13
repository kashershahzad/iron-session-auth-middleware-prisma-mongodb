import { SessionOptions } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      email: string;
      name?: string;
    };
  }
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? "",
  cookieName: "User_data",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
