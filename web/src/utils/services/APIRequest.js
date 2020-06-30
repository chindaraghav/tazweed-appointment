import request from "../api/request";
import httpMethods from "../api/httpMethods";

class APIRequest {
  getUrl() {
    throw new Error("Override getUrl method and get url");
  }
  getMethod() {
    throw new Error("Override getMethod method and get Method");
  }
  getBody() {
    return {};
  }
  getParams() {
    return {};
  }
  getContentType() {
    return "application/json";
  }
  getHeaders() {
    return { "Content-Type": this.getContentType() };
  }
  async makeRequest(inputs, { LOADING, SUCCESS, FAILED }, dispatch = () => { }) {
    try {
      const method = this.getMethod();
      let body = undefined;
      if ([httpMethods.POST, httpMethods.PATCH, httpMethods.PUT].includes(method)) {
        body = this.getBody(inputs);
      }
      let params = this.getParams(inputs);
      dispatch({ type: LOADING, inputs });
      let response = await request({ method, headers: this.getHeaders(), url: this.getUrl(inputs), data: body, params });
      dispatch({ type: SUCCESS, payload: response, inputs });
      return response;
    } catch (error) {
      dispatch({ type: FAILED, error, inputs });
    }
  }
}

export default APIRequest;
