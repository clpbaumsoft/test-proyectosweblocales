import moment from "moment";
import type { Moment } from "moment";
import {
  Button,
  Checkbox,
  DialogActions,
  FormControlLabel,
  Box,
  TextField
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { GTRANS } from "@/constants/Globals";
import useTranslation from "@/hooks/useTranslation";
import useModalRestrictedUserForm from "./useModalRestrictedUserForm";
import { ModalRestrictedUserProps } from "@/interfaces/Organisms";
import { TRANS } from "./constants";
import Modal from "@/components/atoms/Dialog";

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
    register,
    isBanned,
    handleCheckboxChange,
  } = useModalRestrictedUserForm(
    visitor,
    onClose
  );

  return (
    <Modal show={open || false} onClose={closeForm}>
      {isInnerLoading && <FullLoader variant="absolute" />}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <h1 className="font-inter text-[24px] font-semibold text-center mb-4">
          {TEXTS.title}
        </h1>
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

            {/* Field: Comment */}
            <Grid size={{ xs: 12, md: 12 }}>
              <LabelForm label={TEXTS.label_ban_comment} />
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                {...register("ban_comment", { required: true })}
                defaultValue={visitor?.ban_comment || ''}
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
    </Modal>
  );
}
