import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Quest — Monte a viagem dos seus sonhos",
  description:
    "Simulador gamificado de planejamento de viagens. Descubra destinos, monte roteiros e compartilhe sua viagem perfeita.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-background text-foreground font-sans">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
