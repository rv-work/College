import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const  {slug}  = await req.json();

    const question = await prisma.question.findUnique({
      where: {
        slug
      },
      include : {
        cases : true,
        templateCode : true,
        wrapperCode: true
      }
    });

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({question}, { status: 200 });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
