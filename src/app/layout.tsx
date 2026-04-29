import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Siêu Thị Hoa OnLine - Cảm hứng từ thiên nhiên",
  description: "Cửa hàng hoa tươi cao cấp phong cách Modern Botanical",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const userData = token ? verifyToken(token) as any : null;

  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col bg-base text-text-main transition-colors duration-500`}
      >
        <LayoutWrapper userData={userData}>
            {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
