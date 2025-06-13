import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        classroomHosted: true,
        classroomJoined: true,
        eventJoined: true,
        eventsHosted: true,
      },
    });

    return NextResponse.json(
      { success: true, users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
