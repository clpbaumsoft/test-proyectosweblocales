import { GERRORS } from "@/constants/Globals";
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import { ErrorResponseDataType } from "@/interfaces/General";
import { Country } from "@/interfaces/Models";
import apiRequest from "@/lib/ApiRequest";
import { AxiosError } from "axios";

export default class CountrySerivce {
  async all(): Promise<Country[]> {
    try {
      return await apiRequest().get('/countries').then((res) => res.data);
    } catch (catchError) {
      const error = catchError as AxiosError
      const status = error?.status || 500
      const dataResponse = (error?.response?.data as ErrorResponseDataType) || { error: "" }
      const message = dataResponse.error || dataResponse.message || GERRORS.error_something_went_wrong
      if (status === 401) {
        throw new AuthError(GERRORS.your_session_has_finished)
      }
      throw new LocalError(message)
    }
  }
}