import httpMethods from "../api/httpMethods";
import APIRequest from "./APIRequest";

class AppointmentAcceptService extends APIRequest {
    getUrl() {
        return "/appointments/accept";
    }
    getBody({ id }) {
        return { id };
    }
    getMethod() {
        return httpMethods.PATCH;
    }
}

export default AppointmentAcceptService;
