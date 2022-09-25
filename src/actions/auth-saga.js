import { call, put, takeLatest } from 'redux-saga/effects';
import AuthService from "../services/auth-service";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./type";

export const register = (username, email, password) => {
    try {
        const response = yield call(AuthService.register(username, email, password));
        yield put({ type: REGISTER_SUCCESS });
        yield put({ type: SET_MESSAGE, data: response.data });
    } catch (e) {
        console.error(e);
        yield put({ type: REGISTER_FAIL, error: e.message });
        yield put({ type: SET_MESSAGE, data: e.data });
    }
}

function* mySaga() {
    yield takeLatest(REGISTER_SUCCESS, register);
}
export default mySaga;