import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

interface QuizRequestBody {
  text?: string;
  questionCount?: number;
  difficulty?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as QuizRequestBody;

    const { text, questionCount = 10, difficulty = "Medium" } = body;

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "Text is required",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert quiz generator.

Based on the following PDF content, generate exactly ${questionCount} multiple choice questions.

Difficulty Level: ${difficulty}

Rules:
- Each question must have exactly 4 options
- Only one correct answer
- Questions should be conceptual and good quality
- Return only valid JSON
- Do not wrap response inside markdown
- Include explanation for every answer

JSON Format:
{
  "title": "Quiz Title",
  "estimatedMinutes": number,
  "questions": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "Correct option text",
      "explanation": "Why this is correct"
    }
  ]
}

PDF Content:
${text.slice(0, 15000)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    // 🔥 THE FIX: Extract the text and verify it is not undefined before passing to JSON.parse()
    const responseText = response.text;

    if (!responseText) {
      return NextResponse.json(
        {
          success: false,
          message: "Gemini returned an empty response",
        },
        { status: 500 },
      );
    }

    let parsedData;

    try {
      // responseText is now strictly typed as a string here
      parsedData = JSON.parse(responseText);
    } catch (parseError) {
      if (parseError instanceof Error) {
        console.error("JSON Parse Error:", parseError.message);
      }
      console.error("Raw Gemini Response:", responseText);

      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON returned from Gemini",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Gemini Quiz Generation Error:", error.message);
    } else {
      console.error("Gemini Quiz Generation Error:", String(error));
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate quiz",
      },
      { status: 500 },
    );
  }
}
