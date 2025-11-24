import { Roboto, Bungee } from "next/font/google";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next"

const roboto = Roboto({
  variable: "--font-roboto",
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
        className={`${roboto.variable} ${bungee.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
