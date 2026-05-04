import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { v4 as uuidv4 } from "uuid";
import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from "@google/genai";
import { QdrantClient } from "@qdrant/js-client-rest";

export const runtime = "nodejs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY!,
});

const COLLECTION_NAME = "pdf-documents";

interface GeminiEmbedResponse {
  embeddings?: Array<{ values: number[] }>;
  embedding?: { values: number[] };
}

interface QdrantError {
  data?: string | object;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // PDF Extraction
    const parser = new PDFParse({ data: buffer });
    const parsed = await parser.getText();
    const extractedText = parsed.text.replace(/\s+/g, " ").trim();

    if (!extractedText) {
      return NextResponse.json(
        { success: false, message: "PDF is empty" },
        { status: 400 },
      );
    }

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const chunkedDocs = await textSplitter.splitDocuments([
      { pageContent: extractedText, metadata: {} },
    ]);

    console.log(`📦 Chunks created: ${chunkedDocs.length}`);

    // 🔥 1. Ensure Collection Exists
    const collections = await qdrant.getCollections();
    const exists = collections.collections.some(
      (c) => c.name === COLLECTION_NAME,
    );

    if (!exists) {
      console.log(`🛠️ Creating new Qdrant collection: ${COLLECTION_NAME}`);
      await qdrant.createCollection(COLLECTION_NAME, {
        vectors: { size: 768, distance: "Cosine" },
      });
      console.log(`✅ Collection created!`);
    }

    // 🔥 2. THE FIX: Create Payload Index for 'pdfId' to allow filtering
    try {
      console.log("🛠️ Verifying Payload Index for 'pdfId'...");
      await qdrant.createPayloadIndex(COLLECTION_NAME, {
        field_name: "pdfId",
        field_schema: "keyword", // Exact match filtering ke liye
        wait: true,
      });
      console.log("✅ Payload Index ready!");
    } catch (e) {
      // Ignore if it already exists
      console.log(e);
      console.log("ℹ️ Payload index already exists or skipping.");
    }

    const pdfId = uuidv4();
    const batchSize = 10;

    for (let i = 0; i < chunkedDocs.length; i += batchSize) {
      const batchDocs = chunkedDocs.slice(i, i + batchSize);
      console.log(`\n⏳ Processing Batch starting at index ${i}...`);

      const points = [];

      for (let j = 0; j < batchDocs.length; j++) {
        const doc = batchDocs[j];
        try {
          const response = (await ai.models.embedContent({
            model: "gemini-embedding-001",
            contents: doc.pageContent,
            config: { outputDimensionality: 768 },
          })) as GeminiEmbedResponse;

          const rawValues = response.embeddings
            ? response.embeddings[0].values
            : response.embedding
              ? response.embedding.values
              : null;

          if (rawValues && rawValues.length > 0) {
            const cleanVector = Array.from(rawValues).map((v) => Number(v));

            points.push({
              id: uuidv4(),
              vector: cleanVector,
              payload: {
                text: String(doc.pageContent),
                pdfId: String(pdfId),
                fileName: String(file.name),
                chunkIndex: i + j,
              },
            });
          }
        } catch (e) {
          if (e instanceof Error) {
            console.error(`❌ Gemini Error on Chunk ${i + j}:`, e.message);
          } else {
            console.error(`❌ Gemini Error on Chunk ${i + j}:`, String(e));
          }
        }
      }

      if (points.length > 0) {
        try {
          console.log(`📤 Sending ${points.length} points to Qdrant...`);
          await qdrant.upsert(COLLECTION_NAME, {
            wait: true,
            points: points,
          });
          console.log(`✅ Qdrant Upsert Success for Batch!`);
        } catch (dbErr) {
          const err = dbErr as QdrantError;
          console.error(
            `🔥 Qdrant Error:`,
            JSON.stringify(err.data || err.message || "Database Error"),
          );
          throw dbErr;
        }
      }

      if (i + batchSize < chunkedDocs.length) {
        await new Promise((r) => setTimeout(r, 5000));
      }
    }

    console.log("🚀 ALL DONE! Database is built and ready.");
    return NextResponse.json({
      success: true,
      pdfId,
      total: chunkedDocs.length,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("🔥 FATAL ERROR:", error.stack || error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    console.error("🔥 FATAL ERROR:", String(error));
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
