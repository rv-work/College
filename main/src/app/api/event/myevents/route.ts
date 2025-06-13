import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is missing in headers!" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (!category || (category !== "college" && category !== "coding")) {
      return NextResponse.json(
        { success: false, message: "Invalid category. Use 'college' or 'coding'." },
        { status: 400 }
      );
    }

    const events = await prisma.user.findUnique({
      where: { admissionNumber: userId },
      include: {
        eventsHosted: {
          where: { category: category },
          include : {
            owner : true
          }
        },
        eventJoined: {
          include: {
            register: {
              include: {
                event: {
                  include : {
                    owner : true
                  }
                }
              },
            },
          },
        },
      },
    });

    if (!events) {
      return NextResponse.json(
        { success: false, message: "events not found!" },
        { status: 404 }
      );
    }

    const hostedEvents = events.eventsHosted;
    const joinedEvents = events.eventJoined.filter(
      (reg) => reg.register.event.category === category
    );
    
    
    return NextResponse.json(
      { success: true, data: { hostedEvents, joinedEvents } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
