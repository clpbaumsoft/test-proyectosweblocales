//React and modules
import type { AxiosError } from "axios";

//Constants
import { GERRORS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";

//Interfaces and types
import { ErrorResponseDataType } from "@/interfaces/General";

//Libs
import apiRequest from "@/lib/ApiRequest";

export default class GenerateReportsService {
  /**
   * Requests visits in a date range.
   * Paginated: pass page (1-based) and per_page (number).
   * All results: pass per_page === 'all' (page is ignored).
   * @param start_date - Start date (YYYY-MM-DD)
   * @param end_date - End date (YYYY-MM-DD)
   * @param page - 1-based page number (used only when per_page is a number)
   * @param per_page - Items per page (number) or 'all' for no pagination
   */
  async allVisits(
    start_date: string,
    end_date: string,
    page: number = 1,
    per_page: number | "all" = 50
  ) {
    try {
      const base = `/reports/visit-history/?start_date=${start_date}&end_date=${end_date}`;
      const url =
        per_page === "all"
          ? `${base}&per_page=all`
          : `${base}&page=${page}&per_page=${per_page}`;
      return await apiRequest()
        .get(url)
        .then((res) => res.data);
    } catch (catchError) {
      const error = catchError as AxiosError;
      const status = error?.status || 500;
      const dataResponse = (error?.response?.data as ErrorResponseDataType) || {
        error: "",
      };
      const message =
        dataResponse.error ||
        dataResponse.message ||
        GERRORS.error_something_went_wrong;
      if (status === 401) {
        throw new AuthError(GERRORS.your_session_has_finished);
      }
      throw new LocalError(message);
    }
  }

	
  /**
   * Requests all history for a visitor.
   * identification_type y identification_number are required.
   * start_date y end_date are optionals.
   */
  async visitorsHistory(
    identification_type: string,
    identification_number: string,
    start_date?: string,
    end_date?: string
  ) {
    try {
      let url = `/reports/visitor-history/?identification_type=${identification_type}&identification_number=${identification_number}`;
      if (start_date) {
        url += `&start_date=${start_date}`;
      }
      if (end_date) {
        url += `&end_date=${end_date}`;
      }
      return await apiRequest()
        .get(url)
        .then((res) => {
          return res.data;
        });
    } catch (catchError) {
      const error = catchError as AxiosError;
      const status = error?.status || 500;
      const dataResponse = (error?.response?.data as ErrorResponseDataType) || {
        error: "",
      };
      const message =
        dataResponse.error ||
        dataResponse.message ||
        GERRORS.error_something_went_wrong;
      if (status === 401) {
        throw new AuthError(GERRORS.your_session_has_finished);
      }
      throw new LocalError(message);
    }
  }

  /**
   * Requests all history for a vehicle.
   * plate is required.
   * start_date y end_date are optionals.
   */
  async historyVisitorsVehicle(
    plate: string,
    start_date?: string,
    end_date?: string
  ) {
    try {
      
      let url = `/reports/entry-vehicle/?plate=${plate}`;
      if (start_date) {
        url += `&start_date=${start_date}`;
      }
      if (end_date) {
        url += `&end_date=${end_date}`;
      }
      return await apiRequest()
        .get(url)
        .then((res) => {
          return res.data;
        });
    } catch (catchError) {
      const error = catchError as AxiosError;
      const status = error?.status || 500;
      const dataResponse = (error?.response?.data as ErrorResponseDataType) || {
        error: "",
      };
      const message =
        dataResponse.error ||
        dataResponse.message ||
        GERRORS.error_something_went_wrong;
      if (status === 401) {
        throw new AuthError(GERRORS.your_session_has_finished);
      }
      throw new LocalError(message);
    }
  }

    /**
   * Requests all history for a vehicle for visitors.
   * plate is required.
   * start_date y end_date are optionals.
   */
  async historyEmployeeVehicle(
    plate: string,
    start_date?: string,
    end_date?: string
  ) {
    try {
      let url = `/reports/entry-employee-vehicle/?plate=${plate}`;
      if (start_date) {
        url += `&start_date=${start_date}`;
      }
      if (end_date) {
        url += `&end_date=${end_date}`;
      }
      return await apiRequest()
        .get(url)
        .then((res) => {
          return res.data;
        });
    } catch (catchError) {
      const error = catchError as AxiosError;
      const status = error?.status || 500;
      const dataResponse = (error?.response?.data as ErrorResponseDataType) || {
        error: "",
      };
      const message =
        dataResponse.error ||
        dataResponse.message ||
        GERRORS.error_something_went_wrong;
      if (status === 401) {
        throw new AuthError(GERRORS.your_session_has_finished);
      }
      throw new LocalError(message);
    }
  }

  /**
   * Requests all history for employees without ID cards.
   * start_date y end_date are required.
   */
  async historyEmployeesWithoutIdCards(
    start_date: string,
    end_date: string
  ) {
    try {
      const url = `/reports/entry-employee-no-license/?start_date=${start_date}&end_date=${end_date}`;
      return await apiRequest()
        .get(url)
        .then((res) => {
          return res.data;
        });
    } catch (catchError) {
      const error = catchError as AxiosError;
      const status = error?.status || 500;
      const dataResponse = (error?.response?.data as ErrorResponseDataType) || {
        error: "",
      };
      const message =
        dataResponse.error ||
        dataResponse.message ||
        GERRORS.error_something_went_wrong;
      if (status === 401) {
        throw new AuthError(GERRORS.your_session_has_finished);
      }
      throw new LocalError(message);
    }
  }
}
