import { ADD_SERVICE } from "../constants/auth";
import { bookingService } from "../api/bookingService";

export const addserviceDispatch = data => ({
    type: ADD_SERVICE,
    payload: data
})
export const catchederr = data => ({
    type: ADD_SERVICE,
    payload: data
})

export const AddService = (data) => (dispatch) => {
    dispatch(loggingIn());
    bookingService.addService(data).then(async (res) => {
        await dispatch(addserviceDispatch(res.data));
    }).catch((err) => {
        dispatch(catchederr("err"))
    });
};