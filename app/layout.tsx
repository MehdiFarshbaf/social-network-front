import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Providers from "./Providers";
import CheckAuth from "./CheckAuth";

const vazirmatn = Vazirmatn({
    variable: "--font-vazir-matn",
    subsets: ["arabic"]
})


export const metadata: Metadata = {
    title: {
      default: 'شبکه اجتماعی',
      template: `شبکه اجتماعی | %s`
    },
    description: 'شبکه اجتماعی'
  }

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body dir="rtl"
                className={`${vazirmatn.variable}`}
            >
                <Providers>
                    <CheckAuth>
                        <Header />
                        {children}
                    </CheckAuth>
                </Providers>
            </body>
        </html>
    );
}
