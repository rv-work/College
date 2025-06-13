import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string;};

    return NextResponse.json({
      success: true,
      message: "Access granted",
      userId: decoded.id,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 403 });
  }
}
