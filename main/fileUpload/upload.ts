// import { writeFile } from "fs/promises";
// import path from "path";
// import fs from "fs";
import cloudinary from "../lib//cloudinary";



    // for local......
    // const uploadDir = path.join(process.cwd(), "public/uploads");
    // if (!fs.existsSync(uploadDir)) {
    //   fs.mkdirSync(uploadDir, { recursive: true });
    // }

    // let bannerUrl = "";
    // try {
    //   if (imageFile) {

    //     const bytes = await imageFile.arrayBuffer();
    //     const buffer = Buffer.from(bytes);

    //     const filePath = path.join(uploadDir, imageFile.name);
    //     await writeFile(filePath, buffer);

    //     bannerUrl = `/uploads/${imageFile.name}`;
    //   }
    // } catch (fileError) {
    //   console.error("Error saving image:", fileError);
    //   return NextResponse.json(
    //     { error: "Error uploading image." },
    //     { status: 500 }
    //   );
    // }

// for big files ........
 // File ko Buffer me convert karna
//  const bytes = await imageFile.arrayBuffer();
//  const buffer = Buffer.from(bytes);

//  // Temporary file save karna
//  const tempFilePath = path.join("/tmp", imageFile.name);
//  await fs.writeFile(tempFilePath, buffer);

//  // Cloudinary me upload karna
//  const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
//    folder: "nextjs_uploads", // Custom folder Cloudinary pe
//  });

//  // Temporary file hata do
//  await fs.unlink(tempFilePath);


//for small/medium file this is fast


export const uploadToCloudinary = async (buffer: Buffer, folder: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};

