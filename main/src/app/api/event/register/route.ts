import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { eventId, registrationDetails, isTeam, teamName } = await req.json();
    const {name, email, admissionNumber, branch, mobile, teamEmails} = registrationDetails

    if (!eventId || !name || !email || !admissionNumber || !branch || !mobile || (isTeam &&  !teamEmails )  || !teamName ) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    if (isTeam) {
      if (!Array.isArray(teamEmails) || teamEmails.length < 1 || !teamEmails[0]) {
        return NextResponse.json({ success: false, message: "At least one team member email is required" }, { status: 400 });
      }
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }

    const existingRegistration = await prisma.registration.findFirst({
      where: {
        eventId,
        OR: [
          { email }, 
          {
            teamMembers: {
              some: { userId: admissionNumber }, 
            },
          },
        ],
      },
    });

    if (existingRegistration) {
      return NextResponse.json({ success: false, message: "User already registered for this event" }, { status: 409 });
    }

    if (isTeam) {
      const existingTeamMember = await prisma.userRegister.findFirst({
        where: {
          userId: { in: teamEmails },
          register: {
            eventId,
          },
        },
      });

      if (existingTeamMember) {
        return NextResponse.json({
          success: false,
          message: "One or more team members are already part of another team for this event",
        }, { status: 409 });
      }
    }

    let teamMembers: { admissionNumber: string }[] = [];

    if (isTeam && teamEmails.length > 0) {
      teamMembers = await prisma.user.findMany({
        where: {
          email: { in: teamEmails },
        },
        select: {
          admissionNumber: true,
        },
      });

      if (teamMembers.length !== teamEmails.length) {
        return NextResponse.json({
          success: false,
          message: "Some team members are not registered users",
        }, { status: 404 });
      }
    }

    const registration = await prisma.registration.create({
      data: {
        eventId,
        name,
        email,
        admissionNumber,
        branch,
        mobile,
        isTeam,
        teamName,
        teamMembers: {
          create: [
            
            {
              user: { connect: { admissionNumber } },
            },
            
            ...teamMembers.map((user) => ({
              user: { connect: { admissionNumber: user.admissionNumber } },
            })),
          ],
        },
      },
      include: {
        teamMembers: true,
      },
    });
    



    return NextResponse.json({
      success: true,
      message: "Registration successful",
      registration,
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
