import httpMethods from '../api/httpMethods';
import APIRequest from './APIRequest';
import {APP_ROLE} from '../../constants';

class RegisterService extends APIRequest {
  getUrl() {
    return '/auth/register';
  }
  getBody({email, name}) {
    return {email, name, role: APP_ROLE};
  }
  getMethod() {
    return httpMethods.POST;
  }
}

export default RegisterService;
