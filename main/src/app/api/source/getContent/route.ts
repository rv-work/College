import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { year, branch, subject } = await req.json();

    const branches = await prisma.branch.findMany({
      where: { name: branch },
      include: {
        years: {
          where: { number: parseInt(year) },
          include: {
            subjects: {
              where: { name: subject },
              include: {
                units: {
                  select: {
                    name: true,
                    topics: true,
                    youtube: true,
                    notes: true,
                    ppt: true,
                    important: true,
                  },
                },
                sts: {
                  select: {
                    year: true,
                    semester: true,
                    papers: {
                      select: {
                        id: true,
                        name: true,
                        file: true, 
                      },
                    },
                  },
                },
                aktus: {
                  select: {
                    year: true,
                    file: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log("result : " , branches)

    return NextResponse.json({ success: true, result: branches }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
