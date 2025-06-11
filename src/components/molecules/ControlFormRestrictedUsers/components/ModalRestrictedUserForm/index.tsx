//React and Modules
// import dynamic from "next/dynamic";
import moment from "moment";
import type { Moment } from "moment";

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Box
} from "@mui/material";
import Grid from "@mui/material/Grid2";

//Components
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types

//Styles
import { HeadingForm } from "@/styles/elements";
import useModalRestrictedUserForm from "./useModalRestrictedUserForm";
import { ModalRestrictedUserProps } from "@/interfaces/Organisms";

//Texts
const TRANS = {
  title: {
    id: "ModalRestrictedUserForm.HeadingForm.ScheduleVisit",
    defaultMessage: "Restringir/Habilitar Usuario",
    description: "",
  },
  label_banned_start_time: {
    id: "ModalRestrictedUserForm.Typography.Label.EntryDate",
    defaultMessage: "Fecha inicio restricción:",
    description: "",
  },
  label_banned_end_time: {
    id: "ModalRestrictedUserForm.Typography.Label.DepartureDate",
    defaultMessage: "Fecha final restricción:",
    description: "",
  },
  label_is_banned: {
    id: "ModalRestrictedUserForm.Typography.Label.IsBanned",
    defaultMessage: "Restringir usuario",
    description: "",
  },
  save: {
    id: "ModalRestrictedUserForm.Button.Save",
    defaultMessage: "Guardar",
    description: "",
  },
};

export default function ModalRestrictedUserForm({
  visitor,
  open = false,
  onClose,
}: ModalRestrictedUserProps) {
  const TEXTS = useTranslation(TRANS);
  const GTEXTS = useTranslation(GTRANS);

  const {
    indexRefresh,
    isInnerLoading,
    minDateDeparture,
    message,
    error,
    closeForm,
    handleSubmit,
    onSubmit,
    getInputDateValue,
    onChangeInputDate,
    setMinDateDeparture,
    isValidForm,
    isBanned,
    handleCheckboxChange,
  } = useModalRestrictedUserForm(
    visitor,
    onClose
  );

  return (
    <>
      <Dialog open={open || false} onClose={closeForm}>
        {isInnerLoading && <FullLoader variant="absolute" />}
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <HeadingForm>{TEXTS.title}</HeadingForm>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                {/* Field: Checkbox  */}
                <Grid size={{ xs: 12, md: 12 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isBanned ? true : false}
                        onChange={(event) =>
                          handleCheckboxChange(event.target.checked)
                        }
                        color="primary"
                      />
                    }
                    label={TEXTS.label_is_banned}
                  />
                </Grid>

                {/* Field: start date */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <LabelForm label={TEXTS.label_banned_start_time} />
                  <DatePicker
                    key={`banned_start_timePicer${indexRefresh}`}
                    defaultValue={getInputDateValue("banned_start_time")}
                    onChange={(date: Moment | null) => {
                      onChangeInputDate("banned_start_time", date);
                      if (date) {
                        setMinDateDeparture(date.clone().add(5, "minutes"));
                      }
                    }}
                    minDate={moment()}
                  />
                </Grid>

                {/* Field: end date */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <LabelForm label={TEXTS.label_banned_end_time} />
                  <DatePicker
                    key={`banned_end_timePicer${indexRefresh}`}
                    defaultValue={getInputDateValue("banned_end_time")}
                    onChange={(date: Moment | null) =>
                      onChangeInputDate("banned_end_time", date)
                    }
                    minDate={minDateDeparture}
                  />
                </Grid>

                {/* ERROR MESSAGE */}
                {
                  error &&
                  <Box sx={{ width: "100%", padding: "0px" }}>
                    <FormMessages message={message} error={error} />
                  </Box>
                }

                {/* BUTTONS MODAL */}
                <DialogActions sx={{ width: "100%" }}>
                  <Button onClick={closeForm} variant="outlined">
                    {GTEXTS.close}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isValidForm()}
                  >
                    {TEXTS.save}
                  </Button>
                </DialogActions>
              </Grid>
            </form>
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
