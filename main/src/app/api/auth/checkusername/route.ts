import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";


export async function POST(req: NextRequest) {
  try {
    const { userName} = await req.json();

    if (!userName) {
      return NextResponse.json({ success: false, message: "username is required" }, { status: 400 });
    }
     console.log("userName" , userName)


    const user = await prisma.user.findFirst({
      where: { username :userName},
    });
    
    if (user) {
      return NextResponse.json({ success: false}, { status: 404 });
    } else {
      return NextResponse.json({ success: true}, { status: 200 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
