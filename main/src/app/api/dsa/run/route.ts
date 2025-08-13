import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const JUDGE0_API = process.env.JUDGE0_API;

export async function POST(req: NextRequest) {
  try {
    const { code, language, wrapCode, testCases } = await req.json();

    interface TestCase {
      input: string[];
      output: string;
    }

    const languageMap: Record<string, number> = {
      Java: 62,
      Cpp: 54,
      Python: 71,
    };

    const language_id = languageMap[language];
    if (!language_id) {
      throw new Error("Unsupported language selected.");
    }

    // Prepare all submissions at once
    const submissionsPayload = (testCases as TestCase[]).slice(0, 2).map((tc: TestCase) => {
      const inputObject = Object.fromEntries(
        tc.input.reduce((acc: [string, string][], val: string, index: number) => {
          if (index % 2 === 0) {
            acc.push([val, tc.input[index + 1]]);
          }
          return acc;
        }, [])
      );

      let finalSourceCode = wrapCode;
      Object.entries(inputObject).forEach(([key, val]) => {
        let value = val;
        if (
          value.startsWith("[") &&
          value.endsWith("]") &&
          language_id !== 71
        ) {
          value = value.replace("[", "{").replace("]", "}");
        }
        finalSourceCode = finalSourceCode.replace(
          new RegExp(`{${key.trim()}}`),
          value
        );
      });

      const source_code =
        language_id !== 71
          ? `${finalSourceCode}\n${code}`
          : `${code}\n${finalSourceCode}`;

      return {
        language_id,
        source_code,
        expected_output: tc.output,
        cpu_time_limit: 2,
        memory_limit: 128000,
      };
    });

    // Send batch request
    interface SubmissionResponse {
      token: string;
      [key: string]: unknown;
    }

    const submissionRes = await axios.post(
      `${JUDGE0_API}/submissions/batch?base64_encoded=false&wait=false`,
      { submissions: submissionsPayload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": process.env.JUDGE0_HOST || "",
          "X-RapidAPI-Key": process.env.JUDGE0_KEY || "",
        },
      }
    );

    const tokens: string[] = (submissionRes.data as SubmissionResponse[]).map((sub) => sub.token);

    // Poll until all done
    interface Judge0SubmissionResult {
      status: { id: number; [key: string]: unknown };
      [key: string]: unknown;
    }

    let resultsData: Judge0SubmissionResult[] = [];
    while (true) {
      const res = await axios.get(
        `${JUDGE0_API}/submissions/batch?tokens=${tokens.join(",")}&base64_encoded=false`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": process.env.JUDGE0_HOST || "",
            "X-RapidAPI-Key": process.env.JUDGE0_KEY || "",
          },
        }
      );

      resultsData = res.data.submissions;
      const allDone = resultsData.every((r: Judge0SubmissionResult) => r.status.id >= 3);
      if (allDone) break;

      await new Promise((r) => setTimeout(r, 1000));
    }

    return NextResponse.json({
      success: true,
      results: resultsData.map((r, idx) => ({
        input: testCases[idx].input,
        output: testCases[idx].output,
        result: r,
      })),
    });

  } catch (err: unknown) {
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
