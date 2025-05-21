import type { Metadata } from "next";
import { headers } from "next/headers";
import { ToastContainer } from "react-toastify";

//Components
import LoaderPages from "@/components/atoms/LoaderPages";
import MuiConfimModal from "@/packages/mui-confirm-modal/src/components/MuiConfirmModal";

//Providers
import MuiProvider from "@/providers/MuiProvider";

//Styles
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Include weights as needed
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Registro de Visitas",
  description: "",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  const locale = acceptLanguage?.split(',')[0];

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} antialiased`}
      >
        <LoaderPages />
        <ToastContainer />
        <MuiProvider>
          <MuiConfimModal />
          {children}
        </MuiProvider>
      </body>
    </html>
  );
}
