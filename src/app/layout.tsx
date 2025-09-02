import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import BMKGTimeBar from "@/components/organisms/BMKGTimeBar";
import Footer from "@/components/organisms/Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/organisms/AppSidebar"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Iklim dan Kualitas Udara",
  description: "Informasi mengenai iklim dan kualitas udara di Indonesia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <main>
            <BMKGTimeBar />
            <SidebarTrigger />
            {children}
            <Footer />
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
