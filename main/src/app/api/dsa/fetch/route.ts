import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("userId");

  try {
    const sheets = await prisma.sheet.findMany({
      include: {
        level: {
          include: {
            questions: {
              include: {
                level: true,
                solvedBy: {
                  select: {
                    userId: true,
                    createdAt: true,
                  },
                },
                markForRevisionBY:true
              },
            },
          },
        },
      },
    });

    const processedSheets = sheets.map((sheet) => ({
      ...sheet,
      level: sheet.level.map((lvl) => ({
        ...lvl,
        questions: lvl.questions.map((ques) => {
          const solvedEntry = ques.solvedBy.find((s) => s.userId === userId);
          const markedEntry = ques.markForRevisionBY.find((m) => m.userId === userId);

          return {
            ...ques,
            completed: !!solvedEntry,
            completedAt: solvedEntry?.createdAt || null,
            markedForRevision: !!markedEntry,
          };
        }),
      })),
    }));

    return NextResponse.json({
      message: "Sheets fetched successfully",
      sheet: processedSheets,
    });
  } catch (error) {
    console.error("Error fetching sheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch sheets" },
      { status: 500 }
    );
  }
}
