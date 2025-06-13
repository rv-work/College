import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    const userId = req.headers.get("userId");

    if (!userId || !slug) {
      return NextResponse.json(
        { error: "Missing userId or quesId" },
        { status: 400 }
      );
    }

    const question = await prisma.question.findFirst({
      where : {
        slug
      } 
    })

    if(!question) {
      return NextResponse.json({ success: true , message : "Question Not Found !!" }, { status: 200 });
    }

    const existingConnection = await prisma.questionConnect.findFirst({
      where: {
        userId,
        questionId: question.id,
      },
    });

    if (existingConnection) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const questionConnect = await prisma.questionConnect.create({
      data: {
        userId,
        questionId: question.id,
      },
    });

    console.log("data.............", questionConnect);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error connecting question:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
