"use client";
import { useState } from "react";
import {BOILERPLATE_CODE} from "./BoilerCodes"
import TC from "./TC";
import TL from "./TL";
import TR from "./TR";
import BL from "./BL";
import BR from "./BR";




interface ClassProps {
  roomId: string;
  isHost : boolean
}

const Class: React.FC<ClassProps> = ({ roomId , isHost  }) => {
  const [code, setCode] = useState<string>(BOILERPLATE_CODE["javascript"]);
  const [output, setOutput] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("javascript");
  const [show, setShow] = useState<boolean>(false);



  return (
    <div className="text-white p-6">
       <div>
       <TC roomId={roomId} setCode={setCode} code={code}  setOutput={setOutput} setLoading={setLoading} language={language} setLanguage={setLanguage} input={input} setShow={setShow} />
       </div>
      

      <div className="flex gap-8 mb-6 w-full">
        <div className="w-full ">
          <TL language={language} code={code}  setCode={setCode} roomId={roomId}  />
        </div>
        <div className="w-full">
          <TR loading={loading} output={output} setInput ={setInput} show={show} setShow={setShow}/>
        </div>
      </div>

      <div className="flex gap-8 w-full">
        <div className="w-full">
          <BL roomId={roomId} isHost={isHost} />
        </div>
        <div className="w-full">
          <BR roomId={roomId} />
        </div>
      </div>
    </div>
  );
};

export default Class;
