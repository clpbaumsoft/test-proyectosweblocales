// app/(app)/layout.tsx  ← SERVER
import { verifyLogin } from "@/lib/Server";
import AppLayoutClient from "./AppLayoutClient";
import { redirect, notFound } from "next/navigation";
import PAGES from "@/constants/Pages";
import FullScreenMessage from "@/components/organisms/FullScreenMessage";
import AuthError from "@/errors/AuthError";
import AccessDeniedError from "@/errors/AccessDeniedError";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const user = await verifyLogin();
    return <AppLayoutClient user={user}>{children}</AppLayoutClient>;
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(PAGES.login);
    }

    if (error instanceof AccessDeniedError) {
      return <FullScreenMessage message={error.message} />;
    }

    if (error instanceof PageNotFoundError) {
      return notFound();
    }

    throw error;
  }
}