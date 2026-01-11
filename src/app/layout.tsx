import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { FolderProvider } from "@/context/FolderContext";
import { ShopProvider } from "@/context/ShopContext";
// ... boshqa providerlar
import "./globals.css";

export const metadata: Metadata = {
  title: "Qarzlar",
  description: "Qarzlarni boshqarish ilovasi",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Qarzlar",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>
        <AuthProvider>
          <ShopProvider>
            <FolderProvider>
              {/* Boshqa providerlar... */}
              {children}
            </FolderProvider>
          </ShopProvider>
        </AuthProvider>
      </body>
    </html>
  );
}