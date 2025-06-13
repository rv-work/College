import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const JUDGE0_API = "http://localhost:2358"; 

export async function POST(req: NextRequest) {
  try {
    const { code, language, wrapCode, testCases } = await req.json();
   

    const languageMap: Record<string, number> = {
      Java: 62,
      Cpp: 54,
      Python: 71,
    };
    
    const language_id = languageMap[language];
    
    if (!language_id) {
      throw new Error("Unsupported language selected.");
    }
    
    


    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];

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


      const submission = await axios.post(
        `${JUDGE0_API}/submissions?base64_encoded=false&wait=false`,
        {
          language_id,
          source_code,
          expected_output: tc.output,
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

      console.log("Result for test case:", i, result.data);
       
      if(result.data.status.description !== 'Accepted'){
        return NextResponse.json({ success: false});
      }
      
    }


    return NextResponse.json({ success: true});

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
