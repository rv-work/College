import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hosted = await prisma.classroom.findMany({
      where: { ownerId: userId },
      select: {
        title: true,
        startTime: true,
        description: true,
      },
    });

    const joined = await prisma.classroom.findMany({
      where: {
        participants: {
          some: { userId: userId },
        },
        NOT: { ownerId: userId },
      },
      select: {
        title: true,
        startTime: true,
        description: true,
        owner: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      hosted: hosted.map((c) => ({
        title: c.title,
        date: c.startTime.toISOString(),
        description: c.description,
      })),
      joined: joined.map((c) => ({
        title: c.title,
        date: c.startTime.toISOString(),
        description: c.description,
        ownerName: c.owner.name,
      })),
    });

  } catch (error) {
    console.error("Classroom Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
