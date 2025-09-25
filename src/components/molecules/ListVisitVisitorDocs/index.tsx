import {
	Box,
	Button,
	CircularProgress,
	List,
	Typography,
} from "@mui/material";

//Components
import ItemListVisitVisitorDoc from "./components/ItemListVisitVisitorDoc";

//Constants
import { GTRANS } from "@/constants/Globals";

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
}

export default function ListVisitVisitorDocs({ visitVisitor, documentTypes, onChangeStatusVisitor }: ListVisitVisitorDocsProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		isInnerLoading,
		rowsDocs,
		loggedUser,
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
											onChangeItemDoc={(newDoc) => onChangeItemDoc(newDoc, idx)}
										/>
									))
								}
								</List>
								{
									loggedUser.can('approvedocs_visit') && (
										<Box>
											{/* {
												visitVisitor.visitor_type.requirements && (
													<Box
														sx={{
															border: '1px dashed var(--mui-palette-primary-main)',
															p: '10px 10px 5px 10px',
															mb: '10px',
														}}
													>
														<Typography component="label">{TEXTS.label_requirements}</Typography>
														<Typography component="div" sx={{ font: 'var(--mui-font-caption)' }}><p dangerouslySetInnerHTML={{ __html: visitVisitor.visitor_type.requirements.replaceAll('\n', '<br/>') }}></p></Typography>
													</Box>
												)
											} */}
											<Box sx={{ display: 'flex', justifyContent: 'center' }}>
												<Button variant="outlined" onClick={onClickReject}>{TEXTS.reject_visitor}</Button>
												<Box sx={{ width: '10px' }} />
												<Button variant="contained" onClick={onClickApprove}>{TEXTS.approve_visitor}</Button>
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