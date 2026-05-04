import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "PDF file is required" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const parser = new PDFParse({ data: buffer });

    const textContent = await parser.getText();
    const documentInfo = await parser.getInfo();

    // FIX: Access the `.text` property before calling string methods!
    const extractedText = textContent.text
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 20000);

    return NextResponse.json({
      success: true,
      text: extractedText,
      pages: documentInfo.total || 0,
    });
  } catch (error) {
    console.error("PDF Processing Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to process PDF" },
      { status: 500 },
    );
  }
}
