"use client";

import { usePathname } from "next/navigation"; // Para detectar a página atual
import ArtisticMouse from "./components/artisticmouse";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/"; // Verifica se está na página inicial

  return (
    <html lang="br">
      <body
        style={{
          cursor: isHome ? "url('/cursor-pincel.png'), auto" : "default", // Caminho direto e consistente
        }}
      >
        {isHome && <ArtisticMouse />} {/* Apenas na Home */}
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}

