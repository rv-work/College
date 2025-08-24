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

    const formatArrayValue = (value: string, lang: string): string => {
      // Handle null/undefined values
      if (!value || value === "null" || value === "undefined") {
        return "";
      }

      if (!value.startsWith("[") || !value.endsWith("]")) {
        return value;
      }

      const content = value.slice(1, -1);

      if (lang === "Python") {
        return `[${content}]`;
      } else if (lang === "Java") {
        return `{${content}}`;
      } else if (lang === "Cpp") {
        return `{${content}}`;
      }

      return value;
    };

    // Enhanced normalize output for array comparison
    const normalizeOutputArray = (output: string): string[] => {
      if (!output) return [];

      return output
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && line !== "null" && line !== "undefined");
    };

    // Compare outputs handling "or" cases for random outputs
    const compareOutputs = (actual: string, expected: string): boolean => {
      const actualLines = normalizeOutputArray(actual);
      const expectedLines = normalizeOutputArray(expected);

      if (actualLines.length !== expectedLines.length) return false;

      return actualLines.every((actualLine, idx) => {
        const expectedLine = expectedLines[idx];

        // Handle "or" cases for random outputs
        if (expectedLine.includes(" or ")) {
          const validOptions = expectedLine
            .split(" or ")
            .map((opt) => opt.trim());
          return validOptions.includes(actualLine);
        }

        return actualLine === expectedLine;
      });
    };

    const submissionsPayload = (testCases as TestCase[])
      .slice(0, 2)
      .map((tc: TestCase) => {
        // Enhanced input object creation with null checks
        const inputObject = Object.fromEntries(
          tc.input.reduce(
            (acc: [string, string][], val: string, index: number) => {
              if (index % 2 === 0 && index + 1 < tc.input.length) {
                const key = (val || "").trim();
                const value = tc.input[index + 1] || "";

                // Only add if both key and value are valid
                if (
                  key &&
                  value !== null &&
                  value !== undefined &&
                  value !== "null" &&
                  value !== "undefined"
                ) {
                  acc.push([key, value]);
                }
              }
              return acc;
            },
            []
          )
        );

        let finalSourceCode = wrapCode || "";

        // Enhanced placeholder replacement with better error handling
        Object.entries(inputObject).forEach(([key, val]) => {
          const formattedValue = formatArrayValue(val, language) || "";

          const placeholder = `{${key}}`;

          // Create regex pattern and replace
          const regexPattern = placeholder.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          );
          finalSourceCode = finalSourceCode.replace(
            new RegExp(regexPattern, "g"),
            formattedValue
          );
        });

        const source_code =
          language_id === 71
            ? `${code}\n${finalSourceCode}` // Python: function first, then main
            : `${finalSourceCode}\n${code}`; // Java/C++: imports/main first, then class

        console.log("Complete source code:", source_code);

        return {
          language_id,
          source_code,
          expected_output: tc.output?.trim() || "", // Keep original expected output
          cpu_time_limit: 2,
          memory_limit: 128000,
        };
      });

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

    const tokens: string[] = (submissionRes.data as SubmissionResponse[]).map(
      (sub) => sub.token
    );

    interface Judge0SubmissionResult {
      status: { id: number; description: string };
      stdout: string | null;
      stderr: string | null;
      compile_output: string | null;
      time: string;
      memory: number;
      [key: string]: unknown;
    }

    let resultsData: Judge0SubmissionResult[] = [];
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      const res = await axios.get(
        `${JUDGE0_API}/submissions/batch?tokens=${tokens.join(
          ","
        )}&base64_encoded=false`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": process.env.JUDGE0_HOST || "",
            "X-RapidAPI-Key": process.env.JUDGE0_KEY || "",
          },
        }
      );

      resultsData = res.data.submissions;
      const allDone = resultsData.every(
        (r: Judge0SubmissionResult) => r.status.id >= 3
      );
      if (allDone) break;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      attempts++;
    }

    console.log("Raw result from Judge0:", resultsData);

    // Process results with enhanced comparison
    const processedResults = resultsData.map((r, idx) => {
      const rawUserOutput = (r.stdout || "").trim();
      const expectedOutput = (testCases[idx].output || "").trim();

      console.log(`Test case ${idx}:`);
      console.log(`Raw user output: "${rawUserOutput}"`);
      console.log(`Expected output: "${expectedOutput}"`);

      let finalStatus = r.status;

      // Only override status if it's "Accepted" or "Wrong Answer"
      if (r.status.id === 4 || r.status.id === 3) {
        const isCorrect = compareOutputs(rawUserOutput, expectedOutput);

        if (isCorrect) {
          finalStatus = { id: 3, description: "Accepted" };
        } else {
          finalStatus = { id: 4, description: "Wrong Answer" };
        }

        console.log(`Comparison result: ${isCorrect ? "PASS" : "FAIL"}`);
      }

      return {
        input: testCases[idx].input,
        output: testCases[idx].output,
        result: {
          ...r,
          status: finalStatus,
          user_output_lines: normalizeOutputArray(rawUserOutput),
          expected_output_lines: normalizeOutputArray(expectedOutput),
          raw_output: rawUserOutput,
        },
      };
    });

    return NextResponse.json({
      success: true,
      results: processedResults,
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
