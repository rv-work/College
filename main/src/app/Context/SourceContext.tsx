"use client"


import { createContext, ReactNode, useContext, useState } from "react";

interface Unit {
  name: string;
  topics: string[];
  youtube: string[];
  notes: string[];
  ppt: string[];
  important: string[];
}

interface STPaper {
  name: string;
  file: string;
  id : string
}

interface ST {
  year: number;
  semester: string;
  papers: STPaper[];
}

interface AKTU {
  year: number;
  file: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  yearId: string;
  units: Unit[];
  sts: ST[];
  aktus: AKTU[];
}

interface Year {
  id: string;
  number: number;
  branchId: string;
  subjects: Subject[];
}

interface Source {
  id: string;
  name: string;
  years: Year[];
}



interface SourceContextType {
  source: Source[] | undefined;
  setSource: React.Dispatch<React.SetStateAction<Source[]>>;
}



const SourceContext = createContext<SourceContextType | undefined>(undefined);

const SourceContextProvider = ({ children }: { children: ReactNode }) => {

  const [source, setSource] = useState<Source[]>([]);

  return (
    <SourceContext.Provider value={{ source, setSource  }}>
      {children}
    </SourceContext.Provider>
  );
};



export const useSource = () => {
  const context = useContext(SourceContext);
  if (!context) {
    throw new Error("useSource must be used within a SourceContextProvider");
  }
  return context;
};

export default SourceContextProvider;
