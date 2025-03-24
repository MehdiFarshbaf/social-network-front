import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import '@mantine/core/styles.css';
import "./globals.css";
import Header from "@/components/header/Header";
import Providers from "./Providers";
import CheckAuth from "./CheckAuth";

const vazirmatn = Vazirmatn({
    variable: "--font-vazir-matn",
    subsets: ["arabic"]
})

export const metadata: Metadata = {
    title: "شبکه اجتماعی",
    description: "Generated by create next app",
};

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
