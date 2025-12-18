"use client";

import React from "react";
import SessionProvider from "@/providers/SessionProvider";
import MainSidebarV2 from "@/components/molecules/MainSidebarV2";
import { UserType } from "@/interfaces/Models";

type AppLayoutClientProps = {
  user: UserType;
  children: React.ReactNode;
};

export default function AppLayoutClient({ user, children }: AppLayoutClientProps) {
  return (
    <SessionProvider serverUser={user}>
      <MainSidebarV2>
        {children}
      </MainSidebarV2>
    </SessionProvider>
  );
}
