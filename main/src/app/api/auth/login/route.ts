import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { prisma } from "../../../../../lib/prisma";


export async function POST(req: NextRequest) {
  try {
    const { emailOrUsername, password } = await req.json();

    if (!emailOrUsername || !password) {
      return NextResponse.json({ success: false, message: "Email or Username and password are required." }, { status: 400 });
    }
     console.log("emailOrUsername" , emailOrUsername)
     console.log("password" , password)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },
    });
    
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.admissionNumber},
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({ success: true, message: "Login successful." });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, 
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
