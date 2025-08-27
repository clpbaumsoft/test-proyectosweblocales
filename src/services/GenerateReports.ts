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
   * Requests all visits in a date range.
   */
  async allVisits(start_date: string, end_date: string) {
    try {
      return await apiRequest()
        .get(
          `/reports/visit-history/?start_date=${start_date}&end_date=${end_date}`
        )
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
          console.log("👌👌👌👌👌👌👌👌👌👌👌 ~ GenerateReportsService ~ visitorsHistory ~ res:", res);
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
          console.log("👌👌👌👌👌👌👌👌👌👌👌 ~ GenerateReportsService ~ historyEmployeesWithoutIdCards ~ res:", res);
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
