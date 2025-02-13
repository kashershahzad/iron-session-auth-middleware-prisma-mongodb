import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    let name = '';
    let email = '';
    let password = '';
    try {
        const body = await req.json();
        name = body.name;
        email = body.email;
        password = body.password
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    if (!name) {
        return NextResponse.json({ message: "Name is requid" }, { status: 400 })
    }
    if (!email) {
        return NextResponse.json({ message: "Emial is requid" }, { status: 400 })
    }

    if (!password) {
        return NextResponse.json({ message: "Password is requid" }, { status: 400 })
    }

    const Existinguser = await prisma.users.findUnique({
        where: { email }
    })

    if (Existinguser) {
        return NextResponse.json({ message: "User already exists" })
    }

    const Users = await prisma.users.create({

        data: {
            name,
            email,
            password
        }

    })

    return NextResponse.json({Users, message:"User create"})
}