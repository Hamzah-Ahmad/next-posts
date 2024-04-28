import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./context/AuthProvider";
import Header from "./components/Header";
import classNames from "classnames";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Posts",
  description:
    "Basic blog-type application built using Next 14 to familiarize with Server Components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, `bg-gray-50 text-base-100`)}>
        <AuthProvider>
          <Header />
          <div className="max-w-[1280px] m-auto mt-12">{children}</div>
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
