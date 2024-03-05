import type { Metadata } from "next";
import { Inter } from "next/font/google";


import { UserLocationProvider } from "./hooks/useLocation";
import { CardProvider } from "./hooks/useCard";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";


import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PIZZA_TIME",
  description: "PIZZA_TIME next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-700`}>
      <UserLocationProvider>
        <CardProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar isClick={false}/>
          <main className="flex-grow">{children}</main>
          <Footer/>
      </div>
      </CardProvider>
      </UserLocationProvider>
        </body>
    </html>
  );
}
