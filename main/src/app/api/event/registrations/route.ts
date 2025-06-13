import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"; // Adjust if needed

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("userId");
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { success: false, message: "Event ID is required!" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required!" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found!" },
        { status: 404 }
      );
    }

    const registrations = await prisma.registration.findMany({
      where: { eventId },
      include: {
        teamMembers: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!registrations || registrations.length === 0) {
      return NextResponse.json(
        { success: false, message: "No registrations found for this event!" },
        { status: 404 }
      );
    }

    const formattedUserRegistrations =[];
    if (userId !== event.ownerId) {
      const userRegistration = registrations.find((reg) =>
        reg.teamMembers.some((member) => member.user.admissionNumber === userId)
      );

      if (!userRegistration) {
        return NextResponse.json(
          { success: false, message: "You are not registered for this event!" },
          { status: 403 }
        );
      }

      formattedUserRegistrations.push(userRegistration)

      const finalUIFormat = formattedUserRegistrations.map((reg) => ({
        id: reg.id,
        teamName: reg.teamName,
        name: reg.name,
        teamMembers: reg.teamMembers.map((member) => ({
          admissionNumber: member.user.admissionNumber,
          name: member.user.name,
          email: member.user.email,
          mobile: member.user.mobile,
          year: member.user.year,
          branch: member.user.branch,
          profilePicture: member.user.profilePicture,
        })),
        createdAt: reg.createdAt,
      }));

      return NextResponse.json(
        { success: true, data: finalUIFormat },
        { status: 200 }
      );
    }

    const formattedRegistrations = registrations.map((reg) => ({
      id: reg.id,
      teamName: reg.teamName,
      name: reg.name,
      teamMembers: reg.teamMembers.map((member) => ({
        admissionNumber: member.user.admissionNumber,
        name: member.user.name,
        email: member.user.email,
        mobile: member.user.mobile,
        year: member.user.year,
        branch: member.user.branch,
        profilePicture: member.user.profilePicture,
      })),
      createdAt: reg.createdAt,
    }));

    return NextResponse.json(
      { success: true, data: formattedRegistrations },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching event registrations:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
