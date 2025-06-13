import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    
    const userId = req.headers.get("userId");

    const { classroomId } = await req.json();;

    if (!classroomId) {
      return NextResponse.json(
        { success: false, message: "Classroom ID is required!" },
        { status: 400 }
      );
    }


    const classroom = await prisma.classroom.findUnique({
      where: { roomId: classroomId },
    });


    if (!classroom) {
      return NextResponse.json(
        { success: false, message: "Class does not exist!" },
        { status: 404 }
      );
    }


    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is missing in headers!" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { admissionNumber: userId },
    });



    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 404 }
      );
    }


    if (classroom.isStarted) {

      const existingConnection = await prisma.classroomConnect.findUnique({
        where: {
          userId_classId: {
            userId: userId,
            classId: classroom.id,
          },
        },
      });

      if(!existingConnection){
        await prisma.classroomConnect.create({
          data: {
            user: {
              connect: {
                admissionNumber: userId, 
              },
            },
            class: {
              connect: {
                id: classroom.id,
              },
            },
          },
        });
      }
     


      return NextResponse.json({
        userName: user.name,
        success: true,
        message: "Class Joined Successfully!",
      });
    }


    if (classroom.ownerId !== userId) {
      return NextResponse.json(
        { success: false, message: "Class has not been started yet ..Please Try after some time!" },
        { status: 403 }
      );
    }



    await prisma.classroom.update({
      where: { roomId: classroomId },
      data: { isStarted: true },
    });

    
    return NextResponse.json({
      userName: user.name,
      success: true,
      message: "Class started successfully!",
    });
  } catch (error) {
    console.error("❌ Error in starting class:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
