import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const JUDGE0_API = process.env.JUDGE0_API; // Use environment variable instead of localhost

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();

    const languageMap: Record<string, number> = {
      java: 62,
      cpp: 54,
      c: 50,
      python: 71,
      javascript: 63,
    };

    const language_id = languageMap[language];

    if (!language_id) {
      throw new Error("Unsupported language selected.");
    }

    // Submit code to Judge0 API with proper headers
    const submission = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=false`,
      {
        language_id,
        source_code: code,
        cpu_time_limit: 2,
        memory_limit: 128000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": process.env.JUDGE0_HOST || "",
          "X-RapidAPI-Key": process.env.JUDGE0_KEY || "",
        },
      }
    );

    const token = submission.data.token;
    console.log("Submission Token:", token);

    // Poll for results with timeout
    let result;
    let attempts = 0;
    const maxAttempts = 30; // Maximum 30 seconds wait time

    while (attempts < maxAttempts) {
      result = await axios.get(
        `${JUDGE0_API}/submissions/${token}?base64_encoded=false`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": process.env.JUDGE0_HOST || "",
            "X-RapidAPI-Key": process.env.JUDGE0_KEY || "",
          },
        }
      );

      // Status ID >= 3 means processing is complete
      if (result.data.status.id >= 3) break;

      await new Promise((r) => setTimeout(r, 1000));
      attempts++;
    }

    // Check if we hit timeout
    if (attempts >= maxAttempts) {
      throw new Error("Code execution timeout - please try again");
    }

    if (!result) {
      return NextResponse.json({
        success: false,
        msg: "No Result",
      });
    }

    console.log("Final results:", result.data.stdout);

    // Return more detailed response
    return NextResponse.json({
      success: true,
      output: result.data.stdout,
      status: result.data.status,
      time: result.data.time,
      memory: result.data.memory,
      stderr: result.data.stderr,
      compile_output: result.data.compile_output,
    });
  } catch (err: unknown) {
    console.error("Error in code execution:", err);

    if (err instanceof Error) {
      console.error("Error running code:", err.message);
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
