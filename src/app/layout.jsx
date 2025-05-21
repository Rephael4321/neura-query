import "@/ui/globals.css";
import { poppins } from "@/ui/fonts";
import Navbar from "@/ui/navbar/navbar";
import Footer from "@/ui/footer";

export const metadata = {
  title: "NeuraQuery",
  description:
    "A user-friendly frontend interface for Neura Query, enabling users to query their SQL databases using natural language.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
