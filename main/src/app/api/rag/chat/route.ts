import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { QdrantClient } from "@qdrant/js-client-rest";

export const runtime = "nodejs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY!,
});

const COLLECTION_NAME = "pdf-documents";

interface ChatRequestBody {
  pdfId?: string;
  question?: string;
}

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
    const body = (await req.json()) as ChatRequestBody;
    const { pdfId, question } = body;

    if (!pdfId || !question) {
      return NextResponse.json(
        { success: false, message: "pdfId and question are required" },
        { status: 400 },
      );
    }

    // 1. Generate embedding for user question
    const embeddingResponse = (await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: String(question),
      config: {
        outputDimensionality: 768,
      },
    })) as GeminiEmbedResponse;

    const rawValues = embeddingResponse.embeddings
      ? embeddingResponse.embeddings[0].values
      : embeddingResponse.embedding
        ? embeddingResponse.embedding.values
        : null;

    if (!rawValues || rawValues.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to generate valid embedding from Gemini",
        },
        { status: 500 },
      );
    }

    const queryVector = Array.from(rawValues).map((v) => Number(v));

    let searchResults;
    try {
      // 2. Search relevant chunks from Qdrant
      searchResults = await qdrant.search(COLLECTION_NAME, {
        vector: queryVector,
        limit: 5,
        filter: {
          must: [
            {
              key: "pdfId",
              match: { value: String(pdfId) },
            },
          ],
        },
      });
    } catch (qdrantError) {
      const err = qdrantError as QdrantError;
      console.error(
        "🔥 QDRANT SEARCH ERROR:",
        JSON.stringify(err.data || err.message || "Database Error", null, 2),
      );
      throw new Error("Qdrant Search Failed.");
    }

    // 3. Extract matching text from Qdrant payload
    const matchedChunks =
      searchResults
        .map((match) => match.payload?.text)
        .filter(Boolean)
        .join("\n\n") || "";

    const prompt = `
You are an AI assistant.

Answer only using the provided PDF context.

If the answer is not present in the PDF context, say:
"I could not find this information in the uploaded PDF."

PDF Context:
${matchedChunks}

Question:
${question}
`;

    // 4. Generate Answer via LLM
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const answer = response.text;

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("🔥 PDF Chat Error:", error.message);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to chat with PDF",
          error: error.message,
        },
        { status: 500 },
      );
    }

    console.error("🔥 PDF Chat Error:", String(error));
    return NextResponse.json(
      {
        success: false,
        message: "Failed to chat with PDF",
        error: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
