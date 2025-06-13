import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("userId");
    
    console.log("userid" , userId)
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { admissionNumber: userId },
      select: { name: true, email: true, year: true, branch: true , username: true , contributions : true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hostedClassrooms = await prisma.classroom.count({
      where: { ownerId: userId },
    });

    const joinedClassrooms = await prisma.classroom.count({
      where: {
        participants: {
          some: {
            user: {
              admissionNumber: userId, 
            },
          },
        },
        NOT: { ownerId: userId },
      },
    });
    

    const hostedEvents = await prisma.event.count({
      where: { ownerId: userId },
    });

    const participatedEvents = await prisma.event.count({
      where: {
        registrations: {
          some: {
            teamMembers: {
              some: { userId: userId },
            },
          },
        },
        NOT: { ownerId: userId },
      },
    });

    const quizes = await prisma.quize.count({
      where  : {
        userId : userId
      } 
    })

    return NextResponse.json({
      userDetails: user,
      classroomStats: {
        hosted: hostedClassrooms,
        joined: joinedClassrooms,
      },
      eventStats: {
        hosted: hostedEvents,
        participated: participatedEvents,
      },
      quizes : quizes
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
