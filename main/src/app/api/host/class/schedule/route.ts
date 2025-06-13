import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { title, description, detail, datetime } = await req.json();

    if (!title || !description || !detail || !datetime) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "User id Not found" },
        { status: 400 }
      );
    }

    const currentTime = new Date();
    const scheduledTime = new Date(datetime);

    let status: "ongoing" | "upcoming" = "upcoming";

    if (
      currentTime.toDateString() === scheduledTime.toDateString() &&
      scheduledTime > currentTime
    ) {
      status = "ongoing";
    } else if (scheduledTime <= currentTime) {
      status = "ongoing";
    }

    const newClassroom = await prisma.classroom.create({
      data: {
        title,
        description,
        detail,
        startTime: scheduledTime,
        status,
        roomId: uuid(),
        owner: {
          connect: {
            admissionNumber: userId,
          },
        },
      },
    });

    console.log("Classroom created successfully:", newClassroom);

    return NextResponse.json(
      {
        message: "Classroom created successfully",
        classroom: newClassroom,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating classroom:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
