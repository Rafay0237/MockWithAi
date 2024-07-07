import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/redux/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mock With AI",
  description: "AI Mock Interview",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ReduxProvider> */}
            {children}
        {/* </ReduxProvider> */}
            <Toaster />
      </body>
    </html>
  );
}
