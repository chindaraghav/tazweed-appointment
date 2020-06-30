import httpMethods from "../api/httpMethods";
import APIRequest from "./APIRequest";

class AppointmentRejectService extends APIRequest {
    getUrl() {
        return "/appointments/reject";
    }
    getBody({ id }) {
        return { id };
    }
    getMethod() {
        return httpMethods.PATCH;
    }
}

export default AppointmentRejectService;
