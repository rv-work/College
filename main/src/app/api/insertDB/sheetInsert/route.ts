import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { sheet } from "@/app/utils/Question";



export async function POST() {

await prisma.questionConnect.deleteMany({});
await prisma.questionRevisionConnect.deleteMany({});
await prisma.case.deleteMany({});
await prisma.templateCode.deleteMany({});
await prisma.wrapperCode.deleteMany({});
await prisma.question.deleteMany({});
await prisma.level.deleteMany({});
await prisma.sheet.deleteMany({});

  console.log("old sheet deleted succesfully ")

  
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')  
      .replace(/^-+|-+$/g, '');    
  };

  try {
    await Promise.all(
      sheet.map(async (topicData) => {
        await prisma.sheet.create({
          data: {
            topic: topicData.topic,
            level: {
              create: ["Easy", "Medium", "Hard"].map((levelName) => ({
                name: levelName,
                questions: {
                  create: topicData.level[levelName as keyof typeof topicData.level].map(
                    (question) => ({
                      quesNo: question.quesNo,
                      title: question.title,
                      slug : generateSlug( question.title),
                      description: question.description,
                      difficulty: levelName,
                      leetcode: question.leetcode,
                      points: question.points,
                      constraint: question.constraint,
                      tags: question.tag,
                      cases: {
                        create: question.cases.map((testCase) => ({
                          caseNumber: testCase.caseNumber,
                          input: testCase.input,
                          output: testCase.output,
                          explanation: testCase.explanation || null,
                        })),
                      },
                      templateCode: {
                        create: {
                          Python: question.templateCode.Python,
                          Java: question.templateCode.Java,
                          Cpp: question.templateCode.Cpp,
                        },
                      },
                      wrapperCode: {
                        create: {
                          Python: question.wrapperCode.Python,
                          Java: question.wrapperCode.Java,
                          Cpp: question.wrapperCode.Cpp,
                        },
                      },
                    })
                  ),
                }
                
              })),
            },
          },
        });
        console.log("success for " , topicData.topic)

      })
      
    );


    return NextResponse.json({
      message: "Sheets inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting sheets:", error);
    return NextResponse.json(
      { error: "Failed to insert sheets", details: error },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    const sheets = await prisma.sheet.findMany({
      include: {
        level: {
          include: {
            questions: {
              include: {
                cases: true,
                templateCode: true,
                wrapperCode: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json({
      message: "Sheets fetched successfully",
      data: sheets
    });

  } catch (error) {
    console.error("Error fetching sheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch sheets" },
      { status: 500 }
    );
  }
}