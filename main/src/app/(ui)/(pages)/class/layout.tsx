import { SocketProvider } from "@/app/Context/Socket";

export default function SourceLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <SocketProvider>
      {children}
    </SocketProvider>
  );
}
