import type { Metadata } from "next";
import { Space_Grotesk, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SpaceCursor from "@/components/ui/SpaceCursor";

// Primary font - Clean, modern, slightly futuristic
const spaceGrotesk = Space_Grotesk({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Display font - For headings, space-themed
const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Mono font - For code and technical text
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Gaurav Rathva | Software Engineer",
  description: "Mobile & AI Systems Builder | Flutter, React Native, Python, LangChain",
  keywords: ["Software Engineer", "Flutter", "React Native", "AI", "LangChain", "Mobile Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SpaceCursor />
        {children}
      </body>
    </html>
  );
}
