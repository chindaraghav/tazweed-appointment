import httpMethods from '../api/httpMethods';
import APIRequest from './APIRequest';
import {APP_ROLES, FETCH_LIMIT} from '../../constants';

class FetchSellerService extends APIRequest {
  getUrl() {
    return '/users';
  }
  getParams({page}) {
    return {
      limit: FETCH_LIMIT,
      page,
      role: APP_ROLES.SELLER,
    };
  }
  getMethod() {
    return httpMethods.GET;
  }
}

export default FetchSellerService;
