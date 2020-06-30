import httpMethods from '../api/httpMethods';
import APIRequest from './APIRequest';
import {getNextDay, isSameDay} from '../helpers';
import moment from 'moment';

class GetSlotsService extends APIRequest {
  getUrl() {
    return '/slots';
  }
  getParams({forDate, id}) {
    const fromDate = moment(forDate);
    const fromDateMs = isSameDay(fromDate) ? Date.now() : fromDate.valueOf();
    return {
      fromDate: fromDateMs,
      toDate: getNextDay(fromDateMs),
      sellerId: id,
      isBooked: false,
    };
  }
  getMethod() {
    return httpMethods.GET;
  }
}

export default GetSlotsService;
