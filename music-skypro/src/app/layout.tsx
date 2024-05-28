import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import { UserProvider } from "@/contexts/user";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Музыка для души",
  description: "По мнению твоей бабушки",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <ReduxProvider>
          <UserProvider>{children}</UserProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
