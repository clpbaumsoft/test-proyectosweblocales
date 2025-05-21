
import { NextResponse } from "next/server";
import mime from "mime-types";
import { notFound } from "next/navigation";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

//Lib
import { getSessionToken, verifyLogin } from "@/lib/Server";

//Interfaces and types
import { BasePageComponentProps } from "@/interfaces/General";

//Services
import Orchestra from "@/services/Orchestra";


export async function GET(request: Request, { params }: BasePageComponentProps) {

	// Check the session
	await verifyLogin()

	try {
		const token = await getSessionToken()
		const { id } = await params

		const visitDocumentId = !id || id instanceof Array ? 0 : id

		const file = await Orchestra.mediaService.getVisitDocument(visitDocumentId, token)
		const contentType = file.headers["content-type"]
		const ext = mime.extension(contentType)

		return new NextResponse(file.data, {
			status: 200,
			headers: {
				"Content-Type": contentType,
				"Content-Disposition": `inline; filename=documento_visita.${ext}`,
			},
		});
	} catch(catchError) {
		if(catchError instanceof PageNotFoundError) {
			return notFound()
		}
		throw catchError
	}


}