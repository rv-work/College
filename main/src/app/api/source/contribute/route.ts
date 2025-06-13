import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";

async function saveFileToDisk(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${uuidv4()}-${file.name}`;
  const filepath = path.join(process.cwd(), "public/uploads", filename);
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

export async function POST(req: NextRequest) {

  const userId = req.headers.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "User ID not found" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const year = formData.get("year") as string;
    const branch = formData.get("branch") as string;
    const subjectName = formData.get("subject") as string;
    const contributionType = formData.get("type") as string;
    const unitNo = formData.get("unitNo") as string;
    const resourceType = formData.get("resourceType") as string;
    const stType = formData.get("stType") as string;
    const stNumber = formData.get("stNumber") as string;
    const examyear = parseInt(formData.get("examYear") as string);
    const resourceLink = formData.get("resourceLink") as string;
    const file = formData.get("resourceFile") as File | null;

    const subject = await prisma.subject.findFirst({
      where: {
        name: subjectName,
        year: {
          number: parseInt(year),
          branch: {
            name: branch,
          },
        },
      },
    });

    if (!subject) {
      return NextResponse.json({ message: "Subject not found" }, { status: 404 });
    }

    let contribution = await prisma.contribution.findFirst({
      where: {
        contributorId: userId,
      },
      select: {
        id : true,
        youtube: true,
        notes: true,
        ppt: true,
        st: true,
        aktu: true,
      },
    });
    
    if (!contribution) {
      contribution = await prisma.contribution.create({
        data: {
          contributor: {
            connect: {
              admissionNumber: userId,
            },
          },
        },
      });
    }

    let contributionKey = null; 
    console.log("contribution ....................." , contribution)
    
    
     
    let ans ; 
    if (contributionType === "Unit") {
      const fileUrl = file ? await saveFileToDisk(file) : null;

      console.log("unit number.............................. : ", Number(unitNo))

      const existingUnit = await prisma.unit.findFirst({
        where: {
          subjectId: subject.id,
          number: Number(unitNo),
        },
      });

      let updatedFields = {};
      ans  = existingUnit;

      if (resourceType === "YouTubeLink" && resourceLink) {
        updatedFields = { youtube: { push: resourceLink } };
        contributionKey = "youtube"

      } else if (resourceType === "NotesPDF" && fileUrl) {
        updatedFields = { notes: { push: fileUrl } };
         contributionKey = "notes"
      } else if (resourceType === "PPT" && fileUrl) {
        updatedFields = { ppt: { push: fileUrl } };
         contributionKey = "ppt"
      }

      console.log("updated/////////////////.................." , updatedFields)
      console.log("exist...................: ", existingUnit ) 

      if (existingUnit) {
        await prisma.unit.update({
          where: { id: existingUnit.id },
          data: updatedFields,
        });
      } 

      console.log("exist...................: after update ", existingUnit ) 
    }
    
    
    

    if (contributionType === "ST") {
      const fileUrl = file ? await saveFileToDisk(file) : null;
      if (!fileUrl) throw new Error("File required");


      let st = await prisma.sT.findFirst({
        where: {
          subjectId: subject.id,
          semester: stType,
          year: examyear,
        },
      });

      console.log("found st " , st)
      console.log("name  : " , stNumber)

      if (st) {
        const updated = await prisma.paper.updateMany({
          where: {
            stId: st.id,
            name: stNumber,
          },
          data: {
            file: fileUrl,
          },
        });
      
        console.log("Updated count:", updated.count);
      
        const updatedPaper = await prisma.paper.findFirst({
          where: {
            stId: st.id,
            name: stNumber,
          },
          select: {
            name: true,
            file: true,
          },
        });
      
        console.log("Updated paper:", updatedPaper);
      }
      
    
      if (!st) {
        st = await prisma.sT.create({
          data: {
            semester: stType,
            subjectId: subject.id,
            year: examyear,
          },
        });

        console.log("created st " , st)

        const newpaper = await prisma.paper.create({
          data: {
            name: stNumber,
            file: fileUrl,
            stId: st.id,
          },
        });
        console.log("paper st " , newpaper)
      }  

      
      

    
     contributionKey = "st"
    }
    
     
    
    if (contributionType === "AKTU") {
      const fileUrl = file ? await saveFileToDisk(file) : null;
      if (!fileUrl) throw new Error("File required");
    
      const aktu = await prisma.aKTU.findFirst({
        where: {
          year: examyear,
          subjectId: subject.id,
        },
      });
    
      if (aktu) {
        await prisma.aKTU.update({
          where: {
            id: aktu.id,
          },
          data: {
            file: fileUrl,
          },
        });
      } else {
        await prisma.aKTU.create({
          data: {
            year: examyear,
            file: fileUrl,
            subjectId: subject.id,
          },
        });
      }
     contributionKey = "aktu"
    
    }


let updatedData = {};

if (contributionKey === "aktu") {
  updatedData = {
    aktu: {
      set: [...contribution.aktu, new Date().toISOString()], 
    },
  };
} else if (contributionKey === "st") {
  updatedData = {
    st: {
      set: [...contribution.st, new Date().toISOString()], 
    },
  };
} else if (contributionKey === "youtube") {
  updatedData = {
    youtube: {
      set: [...contribution.youtube, new Date().toISOString()], 
    },
  };
}else if (contributionKey === "notes") {
  updatedData = {
    notes: {
      set: [...contribution.notes, new Date().toISOString()], 
    },
  };
} else if (contributionKey === "ppt") {
  updatedData = {
    ppt: {
      set: [...contribution.ppt, new Date().toISOString()], 
    },
  };
}

await prisma.contribution.update({
  where: { id: contribution.id },
  data: updatedData, 
});

  console.log("contribution : " , contribution)
    

    return NextResponse.json({ success : true, message: "Contribution saved successfully!"  , data : ans} ,  { status: 200 });
  } catch (error) {
    console.error("Error saving contribution:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
