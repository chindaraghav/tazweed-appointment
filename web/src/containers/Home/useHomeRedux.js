import { useEffect, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
    fetchAppointments,
    acceptAppointment,
    rejectAppointment,
    removeRejectedAppointments,
    resetError
} from "../../redux/actions/appointments.actions";

function useHomeRedux({ date }) {
    const dispatch = useDispatch();

    // state
    let appointments = useSelector((state) => {
        return state.appointments.data;
    }, shallowEqual);
    let rejectedAppointments = useSelector((state) => {
        return state.appointments.rejectedSlots;
    }, shallowEqual);
    let isLoading = useSelector((state) => {
        return state.appointments.isLoading;
    }, shallowEqual);
    let error = useSelector((state) => {
        return state.appointments.error;
    }, shallowEqual);

    // actions
    const accept = useCallback((id) => { dispatch(acceptAppointment({ id })) }, [dispatch]);
    const reject = useCallback((id) => { dispatch(rejectAppointment({ id })) }, [dispatch]);
    const onErrorClose = useCallback(() => {
        dispatch(resetError());
    }, [dispatch]);
    const removeRejected = useCallback(() => {
        dispatch(removeRejectedAppointments());
    }, [dispatch]);

    // side effects
    useEffect(() => {
        date && dispatch(fetchAppointments({ date }));
    }, [date, dispatch]);

    const state = {
        appointments, rejectedAppointments, isLoading, error
    };
    const actions = {
        accept, reject, onErrorClose, removeRejected
    }

    return { state, actions };
}

export default useHomeRedux;