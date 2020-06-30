import httpMethods from '../api/httpMethods';
import APIRequest from './APIRequest';

class CreateAppointmentService extends APIRequest {
  getUrl() {
    return '/appointments';
  }
  getBody({sellerId, slotId, buyerId}) {
    return {
      sellerId,
      slotId,
      buyerId,
    };
  }
  getMethod() {
    return httpMethods.POST;
  }
}

export default CreateAppointmentService;
