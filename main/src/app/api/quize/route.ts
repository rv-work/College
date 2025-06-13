import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  console.log("inside")
  try {
    const { topic , maxScore } = await req.json();
    const userId = req.headers.get("userId");

    if (!userId || !topic || !maxScore) {
      return NextResponse.json(
        { success  : false, error: "Missing required Fields " },
        { status: 400 }
      );
    }

    const quize = await prisma.quize.create({
      data : {
        user : {
          connect: {
            admissionNumber : userId
          }
        },
        topic,
        maxScore ,   
        score : 0,
        timeTaken : "0"    
      }
    })

    
    console.log("quize............." , quize)

    return NextResponse.json({ success: true , quizeId : quize.id }, { status: 200 });
  } catch (error) {
    console.error("Error connecting question:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}



export async function PUT(req: NextRequest) {
  try {
    const { timeSpent , quizeId} = await req.json();


    const quize = await prisma.quize.update({
      where : {
        id : quizeId
      }, data : {
        score : 10,
        timeTaken  : timeSpent.toString()
      }
    })

    console.log("quize............." , quize)

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error connecting question:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
