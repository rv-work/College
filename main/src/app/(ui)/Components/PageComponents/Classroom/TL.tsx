"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo } from "react";
import { useSocket } from "@/app/Context/Socket";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

interface TLProps {
  setCode: (code: string) => void;
  code: string;
  language: string;
  roomId: string;
}



const TL: React.FC<TLProps> = ({ language, code, setCode, roomId }) => {
  const { socket  , users} = useSocket();

  const mySocketId = socket?.id;

  const canEdit = useMemo(() => {
    return users?.some((user) => user.socketId === mySocketId && user.canEdit);
  }, [users, mySocketId]);

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode && newCode !== code && canEdit) {
      setCode(newCode);
      socket?.emit("codeChange", { roomId, updatedCode: newCode });
    }
  };

  useEffect(() => {
    const handleLoadCode = (newCode: string) => {
      if (newCode !== code) {
        setCode(newCode);
      }
    };

    socket?.on("loadCode", handleLoadCode);
    socket?.on("codeChange", handleLoadCode);

    return () => {
      socket?.off("loadCode", handleLoadCode);
      socket?.off("codeChange", handleLoadCode);
    };
  }, [socket, code, setCode]);

  return (
    <div>
      <MonacoEditor
        height="400px"
        language={language}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          minimap: { enabled: true },
          readOnly: !canEdit, 
        }}
      />
      {!canEdit && <p style={{ color: "red" }}>You do not have edit permissions.</p>}
    </div>
  );
};

export default TL;
