import type { Metadata } from "next";
// import Context from "@/context/Context";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "ecommerce app",
  description: "An ecommerce app built with MERN stack and typeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='relative'>
        {/* <Context> */}
        {children}
        {/* </Context> */}
      </body>
    </html>
  );
}
