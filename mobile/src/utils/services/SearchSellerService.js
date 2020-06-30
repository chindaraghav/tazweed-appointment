import httpMethods from '../api/httpMethods';
import APIRequest from './APIRequest';
import {APP_ROLES} from '../../constants';

class SearchSellerService extends APIRequest {
  getUrl() {
    return '/users/search';
  }
  getParams({name}) {
    return {
      name,
      role: APP_ROLES.SELLER,
    };
  }
  getMethod() {
    return httpMethods.GET;
  }
}

export default SearchSellerService;
