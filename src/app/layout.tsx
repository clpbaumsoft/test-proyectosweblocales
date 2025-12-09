import type { Metadata } from "next";
import { headers } from "next/headers";
import { ToastContainer } from "react-toastify";

//Components
import LoaderPages from "@/components/atoms/LoaderPages";
import MuiConfimModal from "@/packages/mui-confirm-modal/src/components/MuiConfirmModal";

//Providers
import MuiProvider from "@/providers/MuiProvider";

//Styles
import "./globals.css";
import { geistMono, geistSans, inter, roboto } from "@/assets/fonts";

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
