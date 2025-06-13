import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { schema } from "../../utils/structure";


interface Paper {
  name: string;
  file: string;
}

 interface ST {
  year: number;
  semester: string;
  papers: Paper[];
}

 interface AKTUPaper {
  year: number;
  file: string;
}

 interface Unit {
  name: string;
  number: number;
  topics: string[];
  youtube: string[];
  notes: string[];
  ppt: string[];
  important: string[];
}

 interface Subject {
  name: string;
  code: string;
  Units: Unit[];
  STs: ST[];
  AKTU: AKTUPaper[];
}



export async function POST() {
  try {

    await prisma.aKTU.deleteMany({});
    await prisma.paper.deleteMany({});
    await prisma.sT.deleteMany({});
    await prisma.unit.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.year.deleteMany({});
    await prisma.branch.deleteMany({});


    console.log("old deleted")

    
    for (const branchName in schema) {
      await prisma.branch.create({
        data: {
          name: branchName,
          years: {
            create: Object.keys(schema[branchName]).map((yearKey) => {
              const subjects = schema[branchName][yearKey]; 
              console.log("yearkey : " ,yearKey);

              return {
                number: parseInt(yearKey), 
                subjects: {
                  create: subjects.map((subject: Subject) => ({
                    name: subject.name,
                    code: subject.code,
                    units: {
                      create: subject.Units.map((unit: Unit) => ({
                        name: unit.name,
                        topics: unit.topics ,
                        youtube: unit.youtube ,
                        notes: unit.notes ,
                        ppt: unit.ppt ,
                        important: unit.important ,
                        number: unit.number ,
                      })),
                    },
                    sts: {
                      create: subject.STs.map((st: ST) => ({
                        year: st.year,
                        semester: st.semester,
                        papers: {
                          create: st.papers.map((paper: Paper) => ({
                            name: paper.name,
                            file: paper.file,
                          })),
                        },
                      })),
                    },
                    aktus: {
                      create: subject.AKTU.map((aktu: AKTUPaper) => ({
                        year: aktu.year,
                        file: aktu.file,
                      })),
                    },
                  })),
                },
              };
            }),
          },
        },
      });

      console.log(`✅ Data inserted for Branch: ${branchName}`);
    }

    return NextResponse.json({ message: "✅ Database insertion successful!" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    return NextResponse.json({ error: "❌ Failed to insert data!" }, { status: 500 });
  }
}
