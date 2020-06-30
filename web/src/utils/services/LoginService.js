import httpMethods from "../api/httpMethods";
import APIRequest from "./APIRequest";
import { APP_ROLE } from "../../constants";

class LoginService extends APIRequest {
  getUrl() {
    return "/auth/login";
  }
  getBody({ email }) {
    return { email, role: APP_ROLE };
  }
  getMethod() {
    return httpMethods.POST;
  }
}

export default LoginService;
