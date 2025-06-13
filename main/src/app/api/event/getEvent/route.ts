import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const userId =  req.headers.get("userId") 
    const { eventId } = await req.json();

    if (!eventId) {
      return NextResponse.json(
        { success: false, message: "Event ID is required" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId }, 
    });

    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event does not exist" },
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

    return NextResponse.json({ success: true, data: {event , user } }, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}



export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("userId");
    const eventId = req.nextUrl.searchParams.get("eventId");

    if (!eventId) {
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
      select: {
        name: true,
        profilePicture: true,
        admissionNumber: true,
        username: true,
        year: true,
        branch: true,
      },
    });


    if (!user) {
      return NextResponse.json(
        { success: false, message: "User does not exist" },
        { status: 404 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        description: true,
        detail: true,
        startTime: true,
        status: true,
        ownerId: true,
        banner: true,
        domain: true,
        category: true,
        team: true,
        priceSolo: true,
        priceTeam: true,
        isApproved: true,
        isDone: true,
        photos : true,
        sponsors : true,
        organizedBy : true,
        location : true,
        Tags : true,
        helpEmail : true,
        faq : {
          select : {
            question: true,
            answer : true
          }
        },
        timeLines : {
          select : {
            heading: true,
            subheading : true,
            time : true,
          }
        },
        prize : {
          select : {
            position: true,
            message : true,
            amount : true,
          }
        },
        comments: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            comment: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                admissionNumber: true,
                name: true,
                profilePicture: true, 
                username : true,
                year: true,
                branch: true,
              }
            },
            replies: {
              orderBy: { createdAt: "asc" },
              select: {
                id: true,
                replyContent: true,
                createdAt: true,
                updatedAt: true,
                user: {
                  select: {
                    admissionNumber: true,
                    name: true,
                    profilePicture: true, 
                    username : true,
                    year: true,
                    branch: true,
                  },
                },
              },
            },
          },
        },
      },
    });


    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event does not exist" },
        { status: 404 }
      );
    }

  
    return NextResponse.json({ success: true, data: { event , user } }, { status: 200 });


  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
