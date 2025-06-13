import Navbar from "./(ui)/Components/Navbar/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';
import AuthContextProvider from "./Context/AuthContext";
import GlobalParticlesBackground from "./GlobalParticlesBackground";

export default function RootLayout({ children ,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="bg-[#030711]">
        <NextTopLoader
          easing="ease-in"
          color="#3b82f6"
          showSpinner={false}
        />
          <AuthContextProvider>
          <GlobalParticlesBackground />
            <Navbar />
            {children}
          </AuthContextProvider>
  
          <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
