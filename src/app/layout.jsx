import { Mulish } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const fontSans = Mulish({
  subsets: ['latin'],
  variable: '--font-family-sans',
});

export const metadata = {
  title: "VoIP Connect",
  description: "VoIP Connect",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fontSans.variable}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
