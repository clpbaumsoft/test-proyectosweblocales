import type { Metadata } from "next";
import { headers } from "next/headers";
import { ToastContainer } from "react-toastify";
import LoaderPages from "@/components/atoms/LoaderPages";
import MuiConfimModal from "@/packages/mui-confirm-modal/src/components/MuiConfirmModal";
import MuiProvider from "@/providers/MuiProvider";
import "./globals.css";
import { inter } from "@/assets/fonts";

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
    <html lang={locale} className={inter.className}>
      <body className={`${inter.className} antialiased`}>
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
