import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutWrapper from "./layout-wrapper"; // componente client separado

export const metadata: Metadata = {
  title: "motion",
  description: "Uma plataforma para colaboração em tempo real e organização eficiente de ideias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <LayoutWrapper>{children}</LayoutWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}