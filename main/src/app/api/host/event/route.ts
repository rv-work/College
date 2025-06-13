import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { uploadToCloudinary } from "../../../../../fileUpload/upload";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const userId = req.headers.get("userId");

    const ownerId = userId;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const detail = formData.get("details") as string;
    const domain = formData.get("domain") as string;
    const category = formData.get("category") === "Coding" ? "coding" : "college";
    const team = parseInt(formData.get("team") as string, 10);
    const priceSolo = parseInt(formData.get("priceSolo") as string, 10);
    const priceTeam = formData.get("priceTeam")
      ? parseInt(formData.get("priceTeam") as string, 10)
      : null;
    const startTime = new Date(formData.get("startTime") as string);
    const imageFile = formData.get("image") as File | null;
    const location = formData.get("location") as string;
    const organizedBy = formData.get("organizedBy") as string;
    const helpEmail = formData.get("helpEmail") as string;
    const status = formData.get("status") as string;

    const sponsors = JSON.parse(formData.get("sponsors") as string || "[]");
    const tags = JSON.parse(formData.get("tags") as string || "[]");
    const prizes = JSON.parse(formData.get("prizes") as string || "[]");
    const faqs = JSON.parse(formData.get("faqs") as string || "[]");
    const timeLines = JSON.parse(formData.get("timeLines") as string || "[]");

    if (
      !ownerId ||
      !title ||
      !description ||
      !detail ||
      !domain ||
      !category ||
      !team ||
      !priceSolo ||
      !startTime ||
      !imageFile ||
      !location ||
      !organizedBy ||
      !helpEmail
    ) {
      return NextResponse.json({ error: "All required fields must be filled!" }, { status: 400 });
    }

    const bannerBuffer = Buffer.from(await imageFile.arrayBuffer());
    const bannerUpload = await uploadToCloudinary(bannerBuffer, "college-dev");
    const bannerUrl = (bannerUpload as { secure_url: string }).secure_url;

    const photos: string[] = [];
    for (const entry of formData.entries()) {
      const [key, value] = entry;
      if (key.startsWith("photos[")) {
        const photoFile = value as File;
        const buffer = Buffer.from(await photoFile.arrayBuffer());
        const uploadResult = await uploadToCloudinary(buffer, "college-dev");
        photos.push((uploadResult as { secure_url: string }).secure_url);
      }
    }

    const event = await prisma.event.create({
      data: {
        owner : {connect: { admissionNumber: ownerId }},
        title,
        description,
        detail,
        domain,
        category,
        team,
        priceSolo,
        priceTeam,
        startTime,
        location,
        organizedBy,
        helpEmail,
        banner: bannerUrl,
        photos,
        sponsors,
        Tags: tags,
        status,
        isApproved: true,
      },
      select: { id: true },
    });

    console.log("event : " , event)
    console.log("faqs............." , faqs)
    console.log("timeline............." , timeLines)
    console.log("prizes............." , prizes)

    try {
      if (prizes.length > 0) {
        for (const prize of prizes) {
          await prisma.prize.create({
            data: {
              position: prize.position,
              message: prize.message,
              amount: prize.amount,
              event: {
                connect: { id: event.id },
              },
            },
          });
        }
      }
    } catch (error) {
      console.log("err prize", error);
    }
    
    console.log("done prize..............................................");
    

   
    try {
      if (faqs.length > 0) {
        for (const faq of faqs) {
          await prisma.fAQ.create({
            data: {
              question: faq.question,
              answer: faq.answer,
              event: { connect: { id: event.id } },
            },
          });
        }
      }
    } catch (error) {
      console.log("err FAQs", error);
    }
    console.log("done faqs..............................................");
   
    try {
      if (timeLines.length > 0) {
        for (const timeLine of timeLines) {
          await prisma.eventTimeLine.create({
            data: {
              heading: timeLine.heading,
              subheading: timeLine.subheading,
              time: new Date(timeLine.time),
              event: { connect: { id: event.id } },
            },
          });
        }
      }
    } catch (error) {
      console.log("err Timelines", error);
    }
    console.log("done timeline..............................................");
    

  
    
    return NextResponse.json({ message: "Event created successfully!", event }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




export async function DELETE() {
  try {
    //  await prisma.reply.deleteMany({})
    //  await prisma.comment.deleteMany({})
    //  await prisma.userRegister.deleteMany({})
    //  await prisma.registration.deleteMany({})
     await prisma.prize.deleteMany({})
     await prisma.fAQ.deleteMany({})
     await prisma.eventTimeLine.deleteMany({})
     await prisma.event.deleteMany({})

    return NextResponse.json({ message: "Event deleted successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
