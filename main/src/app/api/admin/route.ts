import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const [users, events, classes, contributions, questions , quizes] = await Promise.all([
      prisma.user.findMany({
        select: {
          admissionNumber: true,
          name: true,
          email: true,
          mobile: true,
          profilePicture: true,
          createdAt: true,
          eventJoined: true,
          classroomJoined: true,
          contributions: true,
          questionsSolved: true,
        }
      }),
      prisma.event.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          startTime: true,
          owner: {
            select: {
              name: true,
              admissionNumber: true,
            }
          },
          status: true,
          createdAt: true,
          updatedAt: true,
          isApproved: true,
          isDone: true,
          category: true,
          domain: true,
          priceSolo: true,
          priceTeam: true,
          team: true,
        }
      }),
      prisma.classroom.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          startTime: true,
          status: true,
          isStarted: true,
          isDone: true,
          roomId: true,
          owner: {
            select: {
              name: true,
              admissionNumber: true,
            }
          },
          createdAt: true,
          updatedAt: true,
        }
      }),
      prisma.contribution.findMany({
        select: {
          id: true,
          createdAt: true,
          contributor: {
            select: {
              name: true,
              admissionNumber: true,
            }
          },
          aktu: true,
          st: true,
          youtube: true,
          notes: true,
          ppt: true,
        }
      }),
      prisma.question.findMany({
        select: {
          id: true,
          title: true,
          quesNo: true,
          difficulty: true,
          points: true,
          tags: true,
          solvedBy : {
            select : {
              id : true,
            }
          },
          level: {
            select: {
              id: true,
              name: true,
            }
          },
        },
      }),
      prisma.quize.findMany({
        select: {
          id: true,
          score: true,
          maxScore: true,
          timeTaken: true,
          topic: true,
          user : {
            select: {
              name: true,
              admissionNumber: true,
            }
          },
          createdAt : true
        }
      }),
    ]);

    console.log("data : " ,quizes)

    return NextResponse.json({
      success: true,
      data: {
        users: users.map(user => ({
          admissionNumber: user.admissionNumber,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          profilePicture: user.profilePicture,
          joinedAt: user.createdAt,
          eventsJoinedCount: user.eventJoined.length,
          classesJoinedCount: user.classroomJoined.length,
          contributionsCount: user.contributions.length,
          questionsSolvedCount: user.questionsSolved.length,
        })),
        events,
        classes,
        contributions,
        quizes,
        questions: questions.map(q => ({
          id: q.id,
          title: q.title,
          quesNo: q.quesNo,
          difficulty: q.difficulty,
          points: q.points,
          solvedByCount: q.solvedBy.length,
          tags: q.tags,
          level: q.level,
        }))
      }
    });
    
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
