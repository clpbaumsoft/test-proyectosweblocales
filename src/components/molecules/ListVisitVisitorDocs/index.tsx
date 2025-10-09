import {
	Box,
	Button,
	CircularProgress,
	List,
	Tooltip,
	Typography,
} from "@mui/material";

//Components
import ItemListVisitVisitorDoc from "./components/ItemListVisitVisitorDoc";

//Constants
import { GTRANS } from "@/constants/Globals";
import { VISITOR_STATUS_APPROVED } from "@/constants/Visit";

//Hooks
import useListVisitVisitorDocs from "./useListVisitVisitorDocs";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { ListVisitVisitorDocsProps } from "@/interfaces/Molecules";
import { VisitDocument } from "@/interfaces/Models";

//Texts
const TRANS = {
	approve_visitor: {
		id: "ListVisitVisitorDocs.Button.Approve",
		defaultMessage: "Aprobar",
		description: "",
	},
	reject_visitor: {
		id: "ListVisitVisitorDocs.Button.Reject",
		defaultMessage: "Rechazar",
		description: "",
	},
	label_requirements: {
		id: "ListVisitVisitorDocs.Typography.Label.Requirements",
		defaultMessage: "Requisitos:",
		description: "",
	},
	tooltip_verify_all_docs: {
		id: "ListVisitVisitorDocs.Tooltip.VerifyAllDocs",
		defaultMessage: "Antes de aprobar debe verificar todos los documentos",
		description: "",
	},
}

export default function ListVisitVisitorDocs({ visitVisitor, documentTypes, onChangeStatusVisitor }: ListVisitVisitorDocsProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		isInnerLoading,
		rowsDocs,
		loggedUser,
		allDocsReviewed,
		visitVisitor: currentVisitVisitor,
		onClickApprove,
		onClickReject,
		onChangeItemDoc,
	} = useListVisitVisitorDocs(visitVisitor, onChangeStatusVisitor)

	return (
		<>
			{
				isInnerLoading ? (
					<CircularProgress sx={{ mx: 'auto', display: 'block' }} />
				) : (
					(
						rowsDocs.length !== 0 ? (
							<>
								<List sx={{ pr: '20px' }}>
								{
									rowsDocs.map((itemDoc: VisitDocument, idx: number) => (
										<ItemListVisitVisitorDoc 
											key={`itemVisitVisitorDoc${idx}`}
											prefix={`${idx+1}`}
											itemVisitDoc={itemDoc}
											documentTypes={documentTypes}
											visitorStatus={currentVisitVisitor.status}
											onChangeItemDoc={(newDoc) => onChangeItemDoc(newDoc, idx)}
										/>
									))
								}
								</List>
								{
									loggedUser.can('approvedocs_visit') && currentVisitVisitor.status !== VISITOR_STATUS_APPROVED && (
										<Box>
											<Box sx={{ display: 'flex', justifyContent: 'center' }}>
												
												{/* Boton RECHAZAR visitante en modal aprobar documentos */}
												<Button variant="outlined" onClick={onClickReject}>{TEXTS.reject_visitor}</Button>

												<Box sx={{ width: '10px' }} />

												{/* Boton APROBAR visitante en modal aprobar documentos */}
												<Tooltip 
													title={!allDocsReviewed ? TEXTS.tooltip_verify_all_docs : ""}
													arrow
												>
													<span>
														<Button 
															variant="contained" 
															onClick={onClickApprove}
															disabled={!allDocsReviewed}
														>{TEXTS.approve_visitor}</Button>
													</span>
												</Tooltip>
											</Box>
										</Box>
									)
								}
							</>
						) : (
							<Typography align="center">{GTEXTS.no_results}</Typography>
						)
					)
				)
			}
		</>
	)
}