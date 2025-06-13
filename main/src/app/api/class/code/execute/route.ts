import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const JUDGE0_API = "http://localhost:2358"; 



export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();
   

    const languageMap: Record<string, number> = {
      java: 62,
      cpp: 54,
      c: 50,
      python: 71,
      javascript : 63

    };
    
    const language_id = languageMap[language];
    
    if (!language_id) {
      throw new Error("Unsupported language selected.");
    }
    

      const submission = await axios.post(
        `${JUDGE0_API}/submissions?base64_encoded=false&wait=false`,
        {
          language_id,
          source_code : code,
          cpu_time_limit: 2,
          memory_limit: 128000,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = submission.data.token;
      console.log("Submission Token:", token);

      let result;
      while (true) {
        result = await axios.get(
          `${JUDGE0_API}/submissions/${token}?base64_encoded=false`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (result.data.status.id >= 3) break;
        await new Promise((r) => setTimeout(r, 1000)); 
      }

 
    console.log("final results : " , result.data.stdout)
    return NextResponse.json({ success: true, output : result.data.stdout });

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
