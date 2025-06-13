import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";


export async function POST(req: NextRequest) {
  try {
  
    console.log("aa gya mai bnd krne");

    const { classroomId, msg } = await req.json();

    if (!classroomId || !msg) {
      return NextResponse.json({
        success: false,
        message: "Class details missing!",
      });
    }

    await prisma.classroom.update({
      where: { roomId: classroomId },
      data: { isStarted: false },
    });

    console.log("Class deactivated");

    return NextResponse.json({
      success: true,
      message: "Class Deactivated successfully!",
    });
  } catch (error) {
    console.error("❌ Error in stopping class:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
