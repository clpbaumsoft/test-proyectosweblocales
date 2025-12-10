"use client"

import Home from "@/components/organisms/Home";
import { PageAuthProps } from "@/interfaces/General";
import SessionProvider from "@/providers/SessionProvider";
import MainSidebarV2 from "../molecules/MainSidebarV2";

export default function PageHomeDashboard({ userLogged }: PageAuthProps) {
  return (
    <SessionProvider serverUser={userLogged}>
      <MainSidebarV2>
        <Home />
      </MainSidebarV2>
    </SessionProvider>
  )
}
