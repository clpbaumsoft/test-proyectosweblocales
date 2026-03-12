import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import { VisitVisitor } from "@/interfaces/Models";
import useTranslation from "@/hooks/useTranslation";

interface VisitorDetailsProps {
	visitVisitor: VisitVisitor;
}

const TRANS = {
	visitor_name: {
		id: "VisitorDetails.Label.VisitorName",
		defaultMessage: "Nombre del visitante",
		description: "",
	},
	identification_number: {
		id: "VisitorDetails.Label.IdentificationNumber",
		defaultMessage: "Número de identificación",
		description: "",
	},
	phone: {
		id: "VisitorDetails.Label.Phone",
		defaultMessage: "Teléfono",
		description: "",
	},
	address: {
		id: "VisitorDetails.Label.Address",
		defaultMessage: "Dirección",
		description: "",
	},
	emergency_contact_data: {
		id: "VisitorDetails.Label.EmergencyContactData",
		defaultMessage: "Datos del contacto de emergencia",
		description: "",
	},
	emergency_contact_name: {
		id: "VisitorDetails.Label.EmergencyContactName",
		defaultMessage: "Nombre del contacto de emergencia",
		description: "",
	},
	emergency_contact_phone: {
		id: "VisitorDetails.Label.EmergencyContactPhone",
		defaultMessage: "Teléfono del contacto de emergencia",
		description: "",
	},
	identification_type: {
		id: "VisitorDetails.Label.IdentificationType",
		defaultMessage: "Identificación",
		description: "",
	},
	visitor_type: {
		id: "VisitorDetails.Label.VisitorType",
		defaultMessage: "Tipo de visitante",
		description: "",
	},
	visitor_country: {
		id: "VisitorDetails.Label.VisitorCountry",
		defaultMessage: "País del visitante",
		description: "",
	},
	visitor_city: {
		id: "VisitorDetails.Label.VisitorCity",
		defaultMessage: "Ciudad del visitante",
		description: "",
	},
    visitor_eps: {
        id: "VisitorDetails.Label.VisitorEPS",
        defaultMessage: "EPS del visitante",
        description: "",
    },
    arl_company: {
        id: "VisitorDetails.Label.ArlCompany",
        defaultMessage: "ARL",
        description: "",
    },
};

export default function VisitorDetails({ visitVisitor }: VisitorDetailsProps) {
	const TEXTS = useTranslation(TRANS);

	const visitor = visitVisitor.visitor;
	const visitorType = visitVisitor.visitor_type;
	const identType = visitor.identification_type;
    console.log("VisitorDetails -> visitVisitor", visitVisitor)
	return (
		<Box sx={{ p: 2 }}>
			<Grid container spacing={2}>
				{/* Column 1 */}
				<Grid size={{ xs: 12, md: 6 }}>
					{/* Visitor Name */}
					<Box sx={{ mb: 2 }}>
						<Typography variant="caption" color="textSecondary">
							{TEXTS.visitor_name}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 500 }}>
							{visitor.fullname}
						</Typography>
					</Box>

					{/* Phone */}
					<Box sx={{ mb: 2 }}>
						<Typography variant="caption" color="textSecondary">
							{TEXTS.phone}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 500 }}>
							{visitor.phone || "-"}
						</Typography>
					</Box>

					{/* Address */}
					<Box sx={{ mb: 2 }}>
						<Typography variant="caption" color="textSecondary">
							{TEXTS.address}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 500 }}>
							{visitor.address || "-"}
						</Typography>
					</Box>

                    {/* Country */}
					<Box sx={{ mb: 2 }}>
						<Typography variant="caption" color="textSecondary">
							{TEXTS.visitor_country}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 500 }}>
							{"-"}
						</Typography>
					</Box>

                    {/* EPS */}
					<Box sx={{ mb: 2 }}>
						<Typography variant="caption" color="textSecondary">
							{TEXTS.visitor_eps}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 500 }}>
							{"-"}
						</Typography>
					</Box>
                </Grid>
				{/* Column 2 */}
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* Identification */}
					<Box sx={{ mb: 2 }}>
						<Typography variant="caption" color="textSecondary">
							{TEXTS.identification_type}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 500 }}>
							{identType?.code} - {visitor.identification_number}
						</Typography>
					</Box>

                    {/* Visitor Type */}
					<Box sx={{ mb: 2 }}>
						<Typography variant="caption" color="textSecondary">
							{TEXTS.visitor_type}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 500 }}>
							{visitorType?.short_description || "-"}
						</Typography>
					</Box>

                    {/* City */}
					<Box sx={{ mb: 2 }}>
						<Typography variant="caption" color="textSecondary">
							{TEXTS.visitor_city}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 500 }}>
							{"-"}
						</Typography>
					</Box>

                    {/* ARL Company */}
					<Box sx={{ mb: 2 }}>
						<Typography variant="caption" color="textSecondary">
							{TEXTS.arl_company}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 500 }}>
							{"-"}
						</Typography>
					</Box>

				</Grid>
            </Grid>

            {/* Emergency Contact Data */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="textPrimary">
                    {TEXTS.emergency_contact_data}
                </Typography>
            </Box>
            <Grid container spacing={2}>
				{/* Column 1 */}
				<Grid item xs={12} sm={6}>
					{/* Emergency Contact Name */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="textSecondary">
                            {TEXTS.emergency_contact_name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {visitor.emergency_contact_name || "-"}
                        </Typography>
                    </Box>
                </Grid>
				{/* Column 2 */}
                <Grid item xs={12} sm={6}>
                    {/* Emergency Contact Phone */}
					<Box sx={{ mb: 2 }}>
						<Typography variant="caption" color="textSecondary">
							{TEXTS.emergency_contact_phone}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 500 }}>
							{visitor.emergency_contact_phone || "-"}
						</Typography>
					</Box>
				</Grid>
                
            {/* </Grid> */}
        {/* </Grid> */}
				

				
			</Grid>
		</Box>
	);
}
