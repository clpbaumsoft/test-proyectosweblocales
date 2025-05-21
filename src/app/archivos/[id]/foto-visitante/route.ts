
import { NextResponse } from "next/server";
import mime from "mime-types";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

//Constants
import { GERRORS } from "@/constants/Globals";

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

		const visitorId = !id || id instanceof Array ? 0 : id

		const file = await Orchestra.mediaService.getVisitorPhoto(visitorId, token)
		const contentType = file.headers["content-type"]
		const ext = mime.extension(contentType)

		return new NextResponse(file.data, {
			status: 200,
			headers: {
				"Content-Type": contentType,
				"Content-Disposition": `inline; filename=foto_visitante.${ext}`,
			},
		})
	} catch(catchError) {
		if(catchError instanceof PageNotFoundError) {
			return new NextResponse(GERRORS.page_not_found)
		}
		throw catchError
	}


}