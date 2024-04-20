import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { RegisterType } from "@/app/components/forms/RegisterForm";

export async function POST(req: Request) {
  try {
    const { name, email, password }: RegisterType = await req.json();
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code,
      }),
      { status: 500 }
    );
  }
}
