import httpMethods from "../api/httpMethods";
import APIRequest from "./APIRequest";
import UserUtils from "./UserUtils";

class SlotSaveService extends APIRequest {
  getUrl() {
    return "/slots";
  }
  getBody({ timeRange: [fromTime, toTime], duration }) {
    return { fromTime, toTime, duration, sellerId: new UserUtils().getUserId() };
  }
  getMethod() {
    return httpMethods.POST;
  }
}

export default SlotSaveService;
