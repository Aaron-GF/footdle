import { Geist, Geist_Mono, Bungee } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bungee = Bungee({
  variable: "--font-bungee",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Footdle",
  description: "Similar app to a three in line but in this case it is a player only who has to complete the board with the corresponding soccer players",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bungee.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
