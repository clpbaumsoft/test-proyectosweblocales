import React from 'react'
import { Box } from '@mui/material'
import Grid from "@mui/material/Grid2";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardActiveEntryToOtherBranchProps } from '@/interfaces/Molecules';
import BoldLabel from '@/components/atoms/BoldLabel';
import { formatsDate } from '@/lib/Helpers';
import useTranslation from '@/hooks/useTranslation';

//Texts
const TRANS = {
	label_entry_visitor_to_other_branchs: {
		id: "AccordeonHistoryVisits.Typography.H6.TitleCard",
		defaultMessage: "Historial de visitas a otras sedes",
		description: "",
	},
	label_other_brachs: {
		id: "AccordeonHistoryVisits.BoldLabel.Label.oyher_branch",
		defaultMessage: "Sede",
		description: "",
	},
    label_other_gate: {
		id: "AccordeonHistoryVisits.BoldLabel.Label.other_gate",
		defaultMessage: "Portería",
		description: "",
	},
	label_entry_at: {
		id: "AccordeonHistoryVisits.BoldLabel.Label.EntryAt",
		defaultMessage: "Ingresó a las: ",
		description: "",
	},
    label_leave_entry_at: {
		id: "AccordeonHistoryVisits.BoldLabel.Label.EntryAt",
		defaultMessage: "Salió a las: ",
		description: "",
	},
	label_entry_approver: {
		id: "AccordeonHistoryVisits.Typography.Label.UserWhoGiveEntry",
		defaultMessage: "Persona que dió el ingreso:",
		description: "",
	},
    label_leave_approver: {
		id: "AccordeonHistoryVisits.Typography.Label.UserWhoGiveEntry",
		defaultMessage: "Persona que dió la salida:",
		description: "",
	},
	give_entry_to_other_branch: {
		id: "AccordeonHistoryVisits.Button.GiveEntryVehicle",
		defaultMessage: "Ingreso a sede diferente de la visita original",
		description: "",
	},
	give_entry_vehicle: {
		id: "AccordeonHistoryVisits.Button.GiveEntryVehicle",
		defaultMessage: "Ingreso Vehicular",
		description: "",
	},
	give_leave: {
		id: "AccordeonHistoryVisits.Button.GiveLeave",
		defaultMessage: "Dar salida",
		description: "",
	},
}

export const AccordeonHistoryVisits = ({ visitor }: CardActiveEntryToOtherBranchProps) => {

  const TEXTS = useTranslation(TRANS)

  if(!visitor || 
    !visitor?.active_entry || 
    !visitor?.active_entry?.entry_gates || 
    visitor?.active_entry?.entry_gates?.length === 0
    ) return null

  return (
    <>
    	<Box
            sx={{
                my: '20px',
                borderRadius: 'var(--mui-shape-borderRadius)',
                borderColor: 'var(--mui-palette-info-light)',
                borderWidth: '1px',
                borderStyle: 'solid',
                position: 'relative',
            }}
        >
            <Accordion sx={{
                borderRadius: 'var(--mui-shape-borderRadius)',
                // border: '10px solid var(--mui-palette-info-light)',
            }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: '#FFFFFF'}} />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                    bgcolor: 'var(--mui-palette-info-light)',
                    border: 'var(--mui-palette-info-light)',
                    // bgcolor: '#616161',
                }}
                >
					
                    <Typography 
                        component="span" 
                        variant="h6"
                        sx={{
                            color: 'var(--mui-palette-common-white)',
						    borderTopRadius: 'var(--mui-shape-borderRadius)'
                        }}
                    >{TEXTS.label_entry_visitor_to_other_branchs}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        visitor?.active_entry?.entry_gates?.map((item_entry_gates, index) => {
                            
                            if(!item_entry_gates || item_entry_gates.active === 1) return null

                            return (
                                <Box key={item_entry_gates?.entry_id || index} sx={{ p: '10px'}}>
                                    <Grid container>
                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <Box sx={{ mb: '10px' }}>
                                                <BoldLabel
                                                    label={TEXTS.label_other_brachs}
                                                    value={item_entry_gates?.gate?.branch?.short_description || ''}
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <Box sx={{ mb: '10px' }}>
                                                <BoldLabel
                                                    label={TEXTS.label_other_gate}
                                                    value={item_entry_gates?.gate?.description || ''}
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <Box sx={{ mb: '10px' }}>
                                                <BoldLabel
                                                    label={TEXTS.label_entry_at}
                                                    value={formatsDate(item_entry_gates?.creator_date || '' )}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <Box sx={{ mb: '10px' }}>
                                                <BoldLabel
                                                    label={TEXTS.label_leave_entry_at}
                                                    value={formatsDate(item_entry_gates?.modifier_date || '' )}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <Box>
                                                <Typography component="label">{TEXTS.label_entry_approver}</Typography><br/>
                                                <Typography variant="body2" fontWeight={700}>{item_entry_gates?.creator?.fullname}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <Box>
                                                <Typography component="label">{TEXTS.label_leave_approver}</Typography><br/>
                                                <Typography variant="body2" fontWeight={700}>{item_entry_gates?.modifier?.fullname}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <hr/>
                                    
                                </Box>
                            )
                        })
                    }
                </AccordionDetails>
            </Accordion>
        </Box>
    </>
  )
}
