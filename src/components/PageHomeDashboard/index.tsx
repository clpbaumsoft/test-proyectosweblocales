"use client"

//Components
import Home from "@/components/organisms/Home";
import MainSidebar from "@/components/molecules/MainSidebar";

//Interfaces and types
import { PageAuthProps } from "@/interfaces/General";

//Providers
import SessionProvider from "@/providers/SessionProvider";

export default function PageHomeDashboard({ userLogged }: PageAuthProps) {

  return (
    <>
      <SessionProvider serverUser={userLogged}>
        <MainSidebar>
          <Home />
        </MainSidebar>
      </SessionProvider>
    </>
  )
}
