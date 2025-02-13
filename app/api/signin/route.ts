import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { IronSessionData } from "iron-session";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {

    let email = "";
    let password = "";

    try {
        const body = await req.json()
        email = body.email;
        password = body.password;


        const user = await prisma.users.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json({ Message: "Invalid Email" })
        }


        if (password !== user.password) {
            return NextResponse.json({ Messgae: " Invalid Password" })
        }

        const response = NextResponse.json({ Message: " User Login successfully" })


        const session = await getIronSession<IronSessionData>(req, response, sessionOptions);
        session.user = { id: user.id, name: user.name, email: user.email, }
        await session.save()

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Login failed" }, { status: 500 });

    }

}