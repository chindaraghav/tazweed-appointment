import {
  FETCH_APPOINTMENTS_LOADING,
  FETCH_APPOINTMENTS_FAILURE,
  FETCH_APPOINTMENTS_SUCCESS,

  MARK_APPOINTMENT_FAILURE,
  MARK_APPOINTMENT_LOADING,
  ACCEPT_APPOINTMET_SUCCESS,
  REJECT_APPOINTMET_SUCCESS,
  REMOVE_REJECTED_APPOINTMENTS,
  RESET_APPOINTMENT_ERROR
} from "../actionTypes";
import keyBy from "lodash/keyBy"

import { getErrorMessage, getText } from '../../utils/helpers'
import omit from "lodash/omit";
import cloneDeep from "lodash/cloneDeep";
import { get } from "lodash";

const initialState = {
  isLoading: false,
  data: {},
  error: null,
  rejectedSlots: []
};


export default (state = initialState, { type, payload, inputs = {}, error }) => {
  switch (type) {
    case FETCH_APPOINTMENTS_LOADING:
      return { ...state, isLoading: true };
    case FETCH_APPOINTMENTS_SUCCESS:
      return { ...state, isLoading: false, data: keyBy(payload.data, "id") };
    case FETCH_APPOINTMENTS_FAILURE:
      return { ...state, isLoading: false, error: getErrorMessage(error) };
    case MARK_APPOINTMENT_LOADING: {
      const newData = cloneDeep(state.data);
      Object.assign(newData[inputs.id], { isLoading: true })
      return { ...state, data: newData };
    }
    case MARK_APPOINTMENT_FAILURE: {
      let newData = cloneDeep(state.data);
      Object.assign(newData[inputs.id], { isLoading: false });
      let message = getErrorMessage(error)
      if (message === getText("messages.past_appointmemt_accept")) {
        const pastSlotId = get(state, ["data", inputs.id, "slotId", "id"], null);
        console.log("pastSlotId", pastSlotId, state.data[inputs.id].slotId.id)
        let pastAppointments = pastSlotId ? Object.values(state.data).filter(item => item.slotId.id === pastSlotId).map(item => item.id) : [];
        console.log("pastAppointmets", pastAppointments);
        newData = omit(state.data, pastAppointments)
      }
      return { ...state, data: newData, error: message };
    }
    case ACCEPT_APPOINTMET_SUCCESS:
      {
        const newData = omit(state.data, inputs.id);
        let rejectedSlots = Object.values(newData).filter(item => item.slotId.id === payload.data.slotId).map(item => item.id);
        return ({
          ...state,
          rejectedSlots,
          data: newData ? newData : {},
        });
      }
    case REJECT_APPOINTMET_SUCCESS: {
      return {
        ...state,
        data: omit(state.data, inputs.id)
      };
    }
    case REMOVE_REJECTED_APPOINTMENTS: {
      return ({
        ...state,
        data: omit(state.data, state.rejectedSlots),
        rejectedSlots: []
      });
    }
    case RESET_APPOINTMENT_ERROR: {
      return ({
        ...state,
        error: null
      });
    }
    default:
      return state;
  }
};
