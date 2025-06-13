import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../../lib/prisma"; 

export async function POST(req: NextRequest) {
  try {
    const { eventCategory } = await req.json();

    let events = [];

    if (eventCategory === "classroomEvents") {
      events = await prisma.classroom.findMany({
        where: { isDone: false },
        include: {
          owner: {
            select: {
              admissionNumber: true,
              name: true,
            },
          },
        },
        orderBy: {
          startTime: "asc", 
        },
      });
    }
    else if (eventCategory === "collegeEvents") {
      events = await prisma.event.findMany({
        where: {
          category: "college",
          isDone: false,
        },
        include: {
          owner: {
            select: {
              admissionNumber: true,
              name: true,
            },
          },
        },
        orderBy: {
          startTime: "asc",
        },
      });
    }
    else if (eventCategory === "codingEvents") {
      events = await prisma.event.findMany({
        where: {
          category: "coding",
          isDone: false,
        },
        include: {
          owner: {
            select: {
              admissionNumber: true,
              name: true,
            },
          },
        },
        orderBy: {
          startTime: "asc",
        },
      });
    }
    else {
      return NextResponse.json(
        { success: false, message: "Invalid event category" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true, data: events }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}



