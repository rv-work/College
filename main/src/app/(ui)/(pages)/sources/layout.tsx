import SourceContextProvider from "@/app/Context/SourceContext";

export default function SourceLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <SourceContextProvider>
      {children}
    </SourceContextProvider>
  );
}
