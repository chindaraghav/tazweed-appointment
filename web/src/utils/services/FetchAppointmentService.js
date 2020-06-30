import httpMethods from "../api/httpMethods";
import APIRequest from "./APIRequest";
import UserUtils from "./UserUtils";
import { getNextDay } from "../helpers";

class FetchAppointmentService extends APIRequest {
  getUrl() {
    return "/appointments";
  }
  getParams({ date }) {
    return { sellerId: new UserUtils().getUserId(), fromDate: date, toDate: getNextDay(date) };
  }
  getMethod() {
    return httpMethods.GET;
  }
}

export default FetchAppointmentService;
