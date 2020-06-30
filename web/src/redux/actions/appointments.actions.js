import {
    FETCH_APPOINTMENTS_LOADING,
    FETCH_APPOINTMENTS_SUCCESS,
    FETCH_APPOINTMENTS_FAILURE,

    MARK_APPOINTMENT_LOADING,
    MARK_APPOINTMENT_FAILURE,
    ACCEPT_APPOINTMET_SUCCESS,
    REJECT_APPOINTMET_SUCCESS,
    REMOVE_REJECTED_APPOINTMENTS,
    RESET_APPOINTMENT_ERROR
} from "../actionTypes";

import {
    FetchAppointmentService,
    AppointmentAcceptService,
    AppointmentRejectService
} from '../../utils/services';

export const fetchAppointments = (inputs) =>
    async (dispatch) =>
        new FetchAppointmentService()
            .makeRequest(inputs, {
                LOADING: FETCH_APPOINTMENTS_LOADING,
                SUCCESS: FETCH_APPOINTMENTS_SUCCESS,
                FAILED: FETCH_APPOINTMENTS_FAILURE
            },
                dispatch);

export const acceptAppointment = (inputs) =>
    async (dispatch) =>
        new AppointmentAcceptService()
            .makeRequest(inputs, {
                LOADING: MARK_APPOINTMENT_LOADING,
                SUCCESS: ACCEPT_APPOINTMET_SUCCESS,
                FAILED: MARK_APPOINTMENT_FAILURE
            },
                dispatch);

export const rejectAppointment = (inputs) =>
    async (dispatch) =>
        new AppointmentRejectService()
            .makeRequest(inputs, {
                LOADING: MARK_APPOINTMENT_LOADING,
                SUCCESS: REJECT_APPOINTMET_SUCCESS,
                FAILED: MARK_APPOINTMENT_FAILURE
            },
                dispatch);


export const removeRejectedAppointments = () => ({
    type: REMOVE_REJECTED_APPOINTMENTS
})

export const resetError = () => ({
    type: RESET_APPOINTMENT_ERROR
})
