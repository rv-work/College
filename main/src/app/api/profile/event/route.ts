import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hosted = await prisma.event.findMany({
      where: { ownerId: userId },
      select: {
        title: true,
        startTime: true,
        _count: { select: { registrations: true } }, 
        banner: true,
        description: true,
        category: true,
        domain : true,
      },
    });

    const participated = await prisma.event.findMany({
      where: {
        registrations: {
          some: {
            teamMembers: {
              some: { userId: userId }, 
            },
          },
        },
      },
      select: {
        title: true,
        startTime: true,
        banner: true,
        description: true,
        _count: { select: { registrations: true } },
        owner: { select: { name: true } },
        category : true,
        domain : true,
      },
    });

    return NextResponse.json({
      hosted: hosted.map((e) => ({
        title: e.title,
        date: e.startTime.toISOString(),
        banner: e.banner,
        description: e.description,
        participants: e._count.registrations,
        category: e.category,
        domain : e.domain
      })),
      participated: participated.map((e) => ({
        title: e.title,
        date: e.startTime.toISOString(),
        banner: e.banner,
        description: e.description,
        participants: e._count.registrations,
        ownerName: e.owner.name,
        category: e.category,
        domain : e.domain
      })),
    });
  } catch (error) {
    console.error("Event Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
