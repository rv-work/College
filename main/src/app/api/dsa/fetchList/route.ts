import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const question = await prisma.question.findUnique({
      where: { id },
      include: {
        solvedBy: {
          select: {
            createdAt: true, 
            user: {
              select: {
                name: true,
                year: true,
                branch: true,
                profilePicture: true
              }
            }
          }
        }
      }
    });

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const users = question.solvedBy.map((entry) => ({
      name: entry.user.name,
      year: entry.user.year,
      branch: entry.user.branch,
      profilePicture: entry.user.profilePicture,
      solvedAt: entry.createdAt
    }));

    console.log("users"  ,users)

    return NextResponse.json({ users }, { status: 200 });

  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
