import { notFound, redirect } from "next/navigation";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import PageEntryControl from "@/components/PageEntryControl";
import FullScreenMessage from "@/components/organisms/FullScreenMessage";
import PAGES from "@/constants/Pages";
import AuthError from "@/errors/AuthError";
import AccessDeniedError from "@/errors/AccessDeniedError";
import { BasePageComponentProps } from "@/interfaces/General";


export default async function ControlIngreso({  }: BasePageComponentProps) {
	return <PageEntryControl />
}