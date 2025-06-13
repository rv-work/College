import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const userId =  req.headers.get("userId") 
    const { commentId ,replyContent  , eventId} = await req.json();

    if(!commentId){
      return NextResponse.json(
        { success: false, message: "CommentId is required" },
        { status: 400 }
      )
    }

    if(!replyContent){
      return NextResponse.json(
        { success: false, message: "CommentId is required" },
        { status: 400 }
      )
    }

    if (!eventId ) {
      return NextResponse.json(
        { success: false, message: "Event ID is required" },
        { status: 400 }
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

    if(!user){
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 400 }
      )
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if(!event){
      return NextResponse.json(
        { success: false, message: "Event not found!" },
        { status: 400 }
      )
    }

    
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if(!comment){
      return NextResponse.json(
        { success: false, message: "Comment not found!" },
        { status: 400 }
      )
    }


    const newReply = await prisma.reply.create({
      data : {
        user : {
            connect: {
              admissionNumber: userId,
            },
        },
        comment : {
            connect: {
              id: commentId,
            },
        },
        replyContent
      }
    })

    

    return NextResponse.json({ success: true, data: {event , user , newReply } }, { status: 200 });


  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
