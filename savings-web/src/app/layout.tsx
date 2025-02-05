import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import MetaProvider from "@/components/Metaprovider";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
   title: "Create Flowbite React",
   description: "Generated by create flowbite react",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <head>
            <ThemeModeScript />
         </head>
         <body className={`${inter.className} antialiased dark:bg-slate-800 dark:text-slate-200 container`}>
            <Flowbite>
               <MetaProvider>{children}</MetaProvider>
            </Flowbite>
         </body>
      </html>
   );
}
