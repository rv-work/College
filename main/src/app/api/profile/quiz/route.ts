import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {

  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const quizes = await prisma.quize.findMany({
      where : {userId},
      select : {
        id : true,
        maxScore : true,
        score : true, 
        timeTaken : true,
        topic : true,
        createdAt : true
      }
    })

    return NextResponse.json({
     quizes ,  success : true
    } ,{status : 200} );
   

    console.log("quiz data : " , quizes)

  } catch (error) {
    console.error("Event Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
