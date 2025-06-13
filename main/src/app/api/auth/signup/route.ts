import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed." },
        { status: 405 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid JSON payload." , error },
        { status: 400 }
      );
    }

    const {
      email,
      password,
      mobile,
      admissionNumber,
      name,
      year,
      branch,
      confirmPassword,
      username
    } = body;


    if (
      !email ||
      !password ||
      !mobile ||
      !name ||
      !year ||
      !branch ||
      !admissionNumber ||
      !confirmPassword
      || !username
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    if (password.trim() !== confirmPassword.trim()) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    if (!mobile.startsWith("+91-") || mobile.length !== 14) {
      return NextResponse.json(
        { message: "Invalid mobile number." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    try {
       newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          mobile,
          admissionNumber,
          name,
          year,
          branch,
          username,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      });
      console.log("User created successfully:", newUser);
    } catch (dbError) {
      console.error("Prisma error during user creation:", JSON.stringify(dbError, null, 2));
      return NextResponse.json(
        { message: "Database error.", error: dbError },
        { status: 500 }
      );
    }
    

    const token = jwt.sign(
      { id: newUser.admissionNumber},
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({ success: true, message: "User registered successfully.",
      user: { id: newUser.admissionNumber, email: newUser.email },
     } ,{ status: 201 } );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, 
    });

    
    return response;
   
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
